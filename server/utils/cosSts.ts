import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'
import qs from 'node:querystring'

const StsUrl = 'https://{host}/'

const util = {
  // 获取随机数
  getRandom(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
  },
  // obj 转 query string
  json2str(obj: any, $notEncode?: boolean) {
    const arr: any[] = []
    Object.keys(obj).sort().forEach((item) => {
      const val = obj[item] || ''
      arr.push(`${item}=${$notEncode ? encodeURIComponent(val) : val}`)
    })
    return arr.join('&')
  },
  // 计算签名
  getSignature(opt: any, key: string, method: string, stsDomain: string) {
    const formatString = `${method + stsDomain}/?${util.json2str(opt)}`
    const hmac = crypto.createHmac('sha1', key)
    const sign = hmac.update(Buffer.from(formatString, 'utf8')).digest('base64')
    return sign
  },
  // v2接口的key首字母小写，v3改成大写，此处做了向下兼容
  backwardCompat(data: any) {
    const compat: any = {}
    for (const key in data) {
      if (typeof (data[key]) == 'object') {
        compat[this.lowerFirstLetter(key)] = this.backwardCompat(data[key])
      }
      else if (key === 'Token') {
        compat.sessionToken = data[key]
      }
      else {
        compat[this.lowerFirstLetter(key)] = data[key]
      }
    }

    return compat
  },
  lowerFirstLetter(source: string) {
    return source.charAt(0).toLowerCase() + source.slice(1)
  },
}

// 拼接获取临时密钥的参数
const _getCredential = function (options: any, callback: any) {
  if (options.durationInSeconds !== undefined) {
    console.warn('warning: durationInSeconds has been deprecated, Please use durationSeconds ).')
  }

  const secretId = options.secretId
  const secretKey = options.secretKey
  const proxy = options.proxy || ''
  const region = options.region || 'ap-beijing'
  const durationSeconds = options.durationSeconds || options.durationInSeconds || 1800
  const policy = options.policy
  const endpoint = options.host || options.endpoint || 'sts.tencentcloudapi.com'

  const policyStr = JSON.stringify(policy)
  const action = options.action || 'GetFederationToken' // 默认GetFederationToken
  const nonce = util.getRandom(10000, 20000)
  const timestamp = Number.parseInt(String(+new Date() / 1000))
  const method = 'POST'
  const name = 'cos-sts-nodejs' // 临时会话名称

  const params: any = {
    SecretId: secretId,
    Timestamp: timestamp,
    Nonce: nonce,
    Action: action,
    DurationSeconds: durationSeconds,
    Version: '2018-08-13',
    Region: region,
    Policy: encodeURIComponent(policyStr),
  }
  if (action === 'AssumeRole') {
    params.RoleSessionName = name
    params.RoleArn = options.roleArn
  }
  else {
    params.Name = name
  }
  params.Signature = util.getSignature(params, secretKey, method, endpoint)

  $fetch(StsUrl.replace('{host}', endpoint), {
    method,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      'Host': endpoint,
    },
    body: qs.stringify(params),
    proxy,
  }).then((res: any) => {
    let data = res.Response
    if (data.Error) {
      return callback(data.Error)
    }
    data.startTime = data.ExpiredTime - durationSeconds
    data = util.backwardCompat(data)
    callback(null, data)
  }).catch((err) => {
    callback(err)
  })
}

// 获取联合身份临时访问凭证 GetFederationToken
function getCredential(opt: any, callback: any) {
  Object.assign(opt, { action: 'GetFederationToken' })
  if (callback)
    return _getCredential(opt, callback)
  return new Promise((resolve, reject) => {
    _getCredential(opt, (err: any, data: any) => {
      err ? reject(err) : resolve(data)
    })
  })
}

// 申请扮演角色 AssumeRole
function getRoleCredential(opt: any, callback: any) {
  Object.assign(opt, { action: 'AssumeRole' })
  if (callback)
    return _getCredential(opt, callback)
  return new Promise((resolve, reject) => {
    _getCredential(opt, (err: any, data: any) => {
      err ? reject(err) : resolve(data)
    })
  })
}

const getPolicy = function (scope: any) {
  // 定义绑定临时密钥的权限策略
  const statement = scope.map((item: any) => {
    const action = item.action || ''
    const bucket = item.bucket || ''
    const region = item.region || ''
    const appId = bucket.substr(1 + bucket.lastIndexOf('-'))
    const prefix = item.prefix
    let resource = `qcs::cos:${region}:uid/${appId}:${bucket}/${prefix}`
    if (action === 'name/cos:GetService') {
      resource = '*'
    }
    return {
      action: [action],
      effect: 'allow',
      principal: { qcs: '*' },
      resource: [resource],
    }
  })
  return { version: '2.0', statement }
}

export const cosSts = {
  getCredential,
  getRoleCredential,
  getPolicy,
}
