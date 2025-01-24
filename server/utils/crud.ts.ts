import { and, asc, count, desc, eq, getTableColumns, inArray, like, or } from 'drizzle-orm'
import { deleteSchema as baseDeleteSchema } from '../db/base'

interface ListOrPageOptions {
  select?: Record<string, any>
  keywordLike?: string[]
  eq?: string[]
  inArray?: string[]
  where?: any[]
  orderBy?: Record<string, 'asc' | 'desc'>
}

interface CrudOptions {
  apis?: Array<'add' | 'delete' | 'update' | 'info' | 'list' | 'page'>
  primaryKey?: string
  entity: any
  insertSchema?: any
  updateSchema?: any
  deleteSchema?: any
  addOptions?: {
    after?: (options: any) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
    before?: (options: any) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
  }
  deleteOptions?: {
    after?: (options: any) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
    before?: (options: any) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
  }
  updateOptions?: {
    after?: (options: any) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
    before?: (options: any) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
  }
  infoOptions?: {
    after?: (options: any) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
    select?: Record<string, any>
  }
  listOptions?: ListOrPageOptions
  pageOptions?: ListOrPageOptions
}

async function verify() {
  const event = useEvent()
  let { pathname } = getRequestURL(event)
  pathname = pathname.replace('/api', '').replace('/', ':')
  await verifyPermission(pathname)
}

function isApi(apis: string[], api: string) {
  const event = useEvent()
  const { pathname } = getRequestURL(event)
  return apis.includes(api) && pathname.endsWith(`/${api}`)
}

function getWhereColumns(entity: any, options: ListOrPageOptions) {
  const event = useEvent()
  const query = getQuery(event)

  const whereColumns: any = [...(options.where ?? [])]

  if (options.keywordLike) {
    const likeColumns: any = []
    for (const field of options.keywordLike) {
      if (query.keyword) {
        likeColumns.push(like(entity[field], `%${query.keyword}%`))
      }
    }
    likeColumns.length && whereColumns.push(or(...likeColumns))
  }

  if (options.eq) {
    for (const field of options.eq) {
      if (query[field]) {
        whereColumns.push(eq(entity[field], query[field]))
      }
    }
  }

  if (options.inArray) {
    for (const field of options.inArray) {
      if (query[field]) {
        whereColumns.push(inArray(entity[field], query[field] as []))
      }
    }
  }

  return whereColumns
}

function getOrderByColumns(entity: any, options: ListOrPageOptions) {
  const orderByColumns: any = []

  if (options.orderBy) {
    for (const field in options.orderBy) {
      orderByColumns.push(options.orderBy[field] === 'desc' ? desc(entity[field]) : asc(entity[field]))
    }
  }

  return orderByColumns
}

export async function crud(options: CrudOptions) {
  const {
    apis = ['add', 'delete', 'update', 'info', 'list', 'page'],
    primaryKey = 'id',
    entity,
    insertSchema,
    updateSchema,
    addOptions = {},
    deleteOptions = {},
    deleteSchema = baseDeleteSchema,
    updateOptions = {},
    infoOptions = {},
    listOptions = {},
    pageOptions = {},
  } = options

  const event = useEvent()

  if (isMethod(event, 'POST')) {
    if (isApi(apis, 'add')) {
      await verify()

      const { after, before } = addOptions
      const data = await readValidatedBody(event, insertSchema.parse)

      await before?.(data)

      const list = await useDrizzle()
        .insert(entity)
        .values(data)
        .returning() as any

      await after?.(list)

      return list[0]
    }
  }
  else if (isMethod(event, 'DELETE')) {
    if (isApi(apis, 'delete')) {
      await verify()

      const { after, before } = deleteOptions
      const data = await readValidatedBody(event, deleteSchema.parse)

      if (!data[primaryKey]?.length) {
        throw createError({ statusCode: 400, message: `${primaryKey} 不能为空` })
      }

      await before?.(data)

      const list = await useDrizzle()
        .delete(entity)
        .where(inArray(entity[primaryKey], data[primaryKey]))
        .returning({ id: entity[primaryKey] })

      if (!list.length) {
        throw createError({ statusCode: 404, message: '数据不存在' })
      }

      await after?.(list)

      return list
    }
  }
  else if (isMethod(event, 'PUT')) {
    if (isApi(apis, 'update')) {
      await verify()

      const { after, before } = updateOptions
      const data = await readValidatedBody(event, updateSchema.parse)

      if (!data[primaryKey]) {
        throw createError({ statusCode: 400, message: `${primaryKey} 不能为空` })
      }

      await before?.(data)

      const list = await useDrizzle()
        .update(entity)
        .set(data)
        .where(eq(entity[primaryKey], Number(data[primaryKey])))
        .returning() as any

      await after?.(list)

      return list[0]
    }
  }
  else if (isMethod(event, 'GET')) {
    const query = getQuery(event)

    if (isApi(apis, 'info')) {
      await verify()

      const { after } = infoOptions

      if (!query[primaryKey]) {
        throw createError({ statusCode: 400, message: `${primaryKey} 不能为空` })
      }

      const info = useDrizzle()
        .select()
        .from(entity)
        .where(eq(entity[primaryKey], Number(query[primaryKey])))
        .get()

      if (!info) {
        throw createError({ statusCode: 404, message: '数据不存在' })
      }

      await after?.(info)

      return info
    }
    else if (isApi(apis, 'list')) {
      await verify()

      return useDrizzle()
        .select()
        .from(entity)
        .where(and(...getWhereColumns(entity, listOptions)))
        .orderBy(...getOrderByColumns(entity, listOptions))
        .all()
    }
    else if (isApi(apis, 'page')) {
      await verify()

      const { page = 1, size = 10 } = query

      const list = useDrizzle()
        .select(pageOptions.select ?? getTableColumns(entity))
        .from(entity)
        .where(and(...getWhereColumns(entity, pageOptions)))
        .orderBy(...getOrderByColumns(entity, pageOptions))
        .limit(Number(size))
        .offset((Number(page) - 1) * Number(size))
        .all()

      const countData = useDrizzle()
        .select({ total: count() })
        .from(entity)
        .where(and(...getWhereColumns(entity, pageOptions)))
        .get()

      return {
        list,
        total: countData?.total,
      }
    }
  }
}
