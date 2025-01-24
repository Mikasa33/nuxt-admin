import path from 'node:path'

// 生成要上传的 COS 文件路径文件名
function generateCosKey(ext: string) {
  const date = new Date()
  const m = date.getMonth() + 1
  const ymd = `${date.getFullYear()}${m < 10 ? `0${m}` : m}${date.getDate()}`
  const r = (`000000${Math.random() * 1000000}`).slice(-6)
  const cosKey = `file/${ymd}/${ymd}_${r}${ext ? `${ext}` : ''}`
  return cosKey
}

// 获取临时密钥
function getSts(options: { config: any, cosKey: string }): Promise<any> {
  return new Promise((resolve, reject) => {
    const { config, cosKey } = options

    cosSts.getCredential(
      {
        durationSeconds: config.durationSeconds,
        policy: cosSts.getPolicy(config.allowActions.map((action: string) => {
          return {
            action,
            bucket: config.bucket,
            region: config.region,
            prefix: cosKey,
          }
        })),
        proxy: config.proxy,
        secretId: config.secretId,
        secretKey: config.secretKey,
      },
      (err: any, tempKeys: any) => {
        if (err) {
          reject(err)
        }
        resolve(tempKeys)
      },
    )
  })
}

export default defineEventHandler(async (event) => {
  await verifyPermission('data:cos:sts')

  const { filename } = getQuery(event)

  const { NUXT_COS_BUCKET, NUXT_COS_PROXY, NUXT_COS_REGION, NUXT_COS_SECRET_ID, NUXT_COS_SECRET_KEY } = (import.meta as any).env

  const config = {
    allowActions: [
      'name/cos:PutObject',
    ],
    allowPrefix: '*',
    bucket: NUXT_COS_BUCKET,
    durationSeconds: 1800,
    proxy: NUXT_COS_PROXY,
    region: NUXT_COS_REGION,
    secretId: NUXT_COS_SECRET_ID,
    secretKey: NUXT_COS_SECRET_KEY,
  }
  const ext = path.extname(filename as string)
  const cosKey = generateCosKey(ext)

  try {
    const sts = await getSts({ config, cosKey })
    return {
      TmpSecretId: sts.credentials.tmpSecretId,
      TmpSecretKey: sts.credentials.tmpSecretKey,
      SessionToken: sts.credentials.sessionToken,
      StartTime: sts.startTime,
      ExpiredTime: sts.expiredTime,
      Bucket: config.bucket,
      Region: config.region,
      Key: cosKey,
    } as any
  }
  catch {
    throw createError({ statusCode: 500, message: '获取临时密钥失败' })
  }
})
