import type { PaginationProps } from 'naive-ui'

enum API {
  ADD = '/add',
  DELETE = '/delete',
  INFO = '/info',
  LIST = '/list',
  PAGE = '/page',
  UPDATE = '/update',
}

interface InternalFormOptions {
  /**
   * 加载状态
   */
  loading?: boolean
  /**
   * 数据
   */
  model: Record<string, any>
  /**
   * 保存状态
   */
  saving?: boolean
  /**
   * 是否显示
   */
  show?: boolean
  /**
   * 表单状态
   */
  status?: 'add' | 'edit' | 'view'
  /**
   * 标题
   */
  title?: MaybeRefOrGetter<string>
}

interface ListOptions {
  /**
   * 是否立即加载
   */
  immediate?: boolean
  /**
   * 分页配置
   */
  pagination?: PaginationProps | false
  /**
   * 搜索关键字
   */
  searchKeyword?: string
  /**
   * 搜索参数
   */
  searchParams?: Record<string, any>
  /**
   * 标题
   */
  title?: string
}

interface InternalListOptions extends Required<ListOptions> {
  /**
   * 数据
   */
  data: Record<string, any>[]
  /**
   * 删除状态
   */
  deleting: boolean
  /**
   * 加载状态
   */
  loading: boolean
}

interface ListData {
  /**
   * 列表数据
   */
  list: Record<string, any>[]
  /**
   * 总数
   */
  total: number
}

interface UseCrudOptions {
  /**
   * 基础路径
   */
  baseUrl: string
  /**
   * 接口地址
   */
  apis?: Record<string, string>
  /**
   * 唯一标识，当一个页面有多个 hook 的时候，用于区分
   */
  key?: string
  /**
   * 主键
   */
  primaryKey?: string
  /**
   * 列表配置
   */
  listOptions?: ListOptions
  /**
   * 模块标题
   */
  title?: string | number
  /**
   * 保存数据前回调
   */
  onBeforeSave?: (model: Record<string, any>) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
  /**
   * 删除数据失败回调
   */
  onDeleteError?: (error: any) => void | Promise<void>
  /**
   * 删除数据成功回调
   */
  onDeleteSuccess?: (data: any) => void | Promise<void>
  /**
   * 获取数据失败回调
   */
  onFetchInfoError?: (error: any) => void | Promise<void>
  /**
   * 获取数据成功回调
   */
  onFetchInfoSuccess?: (data: Record<string, any>) => void | Record<string, any> | Promise<void> | Promise<Record<string, any>>
  /**
   * 获取列表数据失败回调
   */
  onFetchListError?: (error: any) => void | Promise<void>
  /**
   * 获取列表数据成功回调
   */
  onFetchListSuccess?: (data: Record<string, any>[] | ListData) => void | Record<string, any>[] | Promise<void> | Promise<Record<string, any>[]>
  /**
   * 保存数据失败回调
   */
  onSaveError?: (error: any) => void | Promise<void>
  /**
   * 保存数据成功回调
   */
  onSaveSuccess?: (model: Record<string, any>) => void | Promise<void>
}

interface UseCrudContextOptions {
  /**
   * 唯一标识，当一个页面有多个 hook 的时候，用于区分
   */
  key?: string
}

interface UseCrudReturn {
  data: Ref<Record<string, any>[]>
  deleting: Ref<boolean>
  loading: Ref<boolean>
  pagination: Ref<PaginationProps | false>
  searchKeyword: Ref<string>
  searchParams: Ref<Record<string, any>>
  title: Ref<string>
  onAdd: (defaultModel?: Record<string, any>) => void
  onBatchDelete: (ids: number[]) => Promise<void>
  onDelete: (model: Record<string, any>) => Promise<void>
  onDialogDelete: (model: Record<string, any>) => Promise<void>
  onEdit: (model: Record<string, any>) => Promise<void>
  onLoad: () => Promise<void>
  onReload: () => Promise<void>
  onSave: () => Promise<void>
}

interface UseCrudContextReturn {
  formRef: Ref
  loading: Ref<boolean>
  model: Ref<Record<string, any>>
  saving: Ref<boolean>
  show: Ref<boolean>
  status: Ref<'add' | 'edit' | 'view'>
  title: Ref<string>
  onSave: () => Promise<void>
}

export function useCrud(options: UseCrudOptions): UseCrudReturn {
  const message = useMessage()
  const dialog = useCustomDialog()

  const {
    baseUrl,
    apis,
    key = 'default',
    primaryKey = 'id',
    title = '',
    listOptions: initListOptions,
    onDeleteError,
    onDeleteSuccess,
    onFetchInfoError,
    onFetchInfoSuccess,
    onFetchListError,
    onFetchListSuccess,
    onBeforeSave,
    onSaveError,
    onSaveSuccess,
  } = options

  const listOptions = reactive<InternalListOptions>({
    data: [],
    immediate: true,
    searchKeyword: '',
    searchParams: {},
    title: `${title}管理`,
    ...initListOptions,
    deleting: false,
    loading: false,
    pagination: unref(initListOptions?.pagination) === false
      ? false
      : {
          page: 1,
          pageSize: 10,
          itemCount: 0,
          pageSizes: [10, 20, 50, 100],
          showQuickJumper: true,
          showSizePicker: true,
          size: 'large',
          ...unref(initListOptions?.pagination),
          onUpdatePage: (page: number) => {
            (listOptions.pagination as PaginationProps)!.page = page
            onLoad()
          },
          onUpdatePageSize: (pageSize: number) => {
            (listOptions.pagination as PaginationProps)!.pageSize = pageSize
            onLoad()
          },
        },
  })

  const formRef = ref()
  const formOptions = reactive<InternalFormOptions>({
    model: {},
    show: false,
    status: 'add',
    title: computed<string>(() => {
      let prefix = '新增'
      if (formOptions.status === 'view') {
        prefix = '查看'
      }
      else if (formOptions.status === 'edit') {
        prefix = '编辑'
      }
      return `${prefix}${title}`
    }),
  })

  /**
   * 执行删除
   *
   * @param body 请求体
   */
  async function executeDelete(body: Record<string, any>) {
    listOptions.deleting = true
    try {
      const data = await $fetch(`${baseUrl}${apis?.delete ?? API.DELETE}`, {
        method: 'delete',
        body,
      })

      if (onDeleteSuccess) {
        await onDeleteSuccess(data)
      }
      else {
        message.success(`${body[primaryKey].length > 1 ? '批量' : ''}删除成功`)
      }

      // 如果分页配置存在
      if (listOptions.pagination) {
        const pagination = listOptions.pagination as PaginationProps
        // 如果当前页码乘以每页数量小于等于总数减去删除数量，则设置页码为新的最后一页
        if (pagination.page! * pagination.pageSize! <= pagination.itemCount! - body[primaryKey].length) {
          pagination.page = Math.ceil(pagination.itemCount! - body[primaryKey].length / pagination.pageSize!)
        }
      }

      onLoad()
    }
    catch (error: any) {
      if (onDeleteError) {
        await onDeleteError(error)
      }
      else {
        message.error(error.data.message)
      }
    }
    finally {
      listOptions.deleting = false
    }
  }

  /**
   * 执行保存
   *
   * @param body 请求体
   */
  async function executeSave(body: Record<string, any>) {
    if (onBeforeSave) {
      body = await onBeforeSave(body) ?? body
    }

    try {
      const data = await $fetch<Record<string, any>>(`${baseUrl}${formOptions.status === 'edit' ? apis?.update ?? API.UPDATE : apis?.add ?? API.ADD}`, {
        method: formOptions.status === 'edit' ? 'put' : 'post',
        body,
      })

      if (onSaveSuccess) {
        await onSaveSuccess(data)
      }
      else {
        message.success('保存成功')
      }

      formOptions.show = false

      onLoad()
    }
    catch (error: any) {
      if (onSaveError) {
        await onSaveError(error)
      }
      else {
        message.error(error.data.message)
      }
    }
  }

  /**
   * 获取数据
   *
   * @param model 数据
   */
  async function fetchInfo(model: Record<string, any>) {
    formOptions.loading = true
    try {
      const data = await $fetch<Record<string, any>>(`${baseUrl}${apis?.info ?? API.INFO}`, {
        params: {
          [primaryKey]: model[primaryKey],
        },
      })

      formOptions.model = await onFetchInfoSuccess?.(data) ?? data
    }
    catch (error: any) {
      if (onFetchInfoError) {
        await onFetchInfoError(error)
      }
      else {
        message.error(error.data.message)
      }
    }
    finally {
      formOptions.loading = false
    }
  }

  /**
   * 获取列表数据
   */
  async function fetchList() {
    listOptions.loading = true
    try {
      const params: Record<string, any> = { ...unref(listOptions.searchParams) }
      if (unref(listOptions.searchKeyword)) {
        params.keyword = unref(listOptions.searchKeyword)
      }

      const data = await $fetch<Record<string, any>[]>(`${baseUrl}${apis?.list ?? API.LIST}`, { params })

      listOptions.data = (await onFetchListSuccess?.(data)) ?? data
    }
    catch (error: any) {
      if (onFetchListError) {
        await onFetchListError(error)
      }
      else {
        message.error(error.data.message)
      }
    }
    finally {
      listOptions.loading = false
    }
  }

  /**
   * 获取分页数据
   */
  async function fetchPage() {
    const pagination = listOptions.pagination as PaginationProps
    listOptions.loading = true
    try {
      const params: Record<string, any> = {
        ...unref(listOptions.searchParams),
        page: pagination.page,
        size: pagination.pageSize,
      }
      if (unref(listOptions.searchKeyword)) {
        params.keyword = unref(listOptions.searchKeyword)
      }

      const data = await $fetch<ListData>(`${baseUrl}${apis?.page ?? API.PAGE}`, { params })

      listOptions.data = (await onFetchListSuccess?.(data)) ?? data.list;
      (listOptions.pagination as PaginationProps).itemCount = data.total
    }
    catch (error: any) {
      if (onFetchListError) {
        await onFetchListError(error)
      }
      else {
        message.error(error.data.message)
      }
    }
    finally {
      listOptions.loading = false
    }
  }

  /**
   * 新增数据
   *
   * @param defaultModel 默认表单数据
   */
  function onAdd(defaultModel?: Record<string, any>) {
    formRef.value?.reset?.()
    formOptions.status = 'add'
    formOptions.show = true
    formOptions.model = defaultModel ?? {} as any
  }

  /**
   * 批量删除数据
   *
   * @param ids 数据主键数组
   */
  async function onBatchDelete(ids: number[]) {
    await executeDelete({ [primaryKey]: ids })
  }

  /**
   * 删除数据
   *
   * @param model 数据
   */
  async function onDelete(model: Record<string, any>) {
    await executeDelete({ [primaryKey]: [model[primaryKey]] })
  }

  /**
   * 弹窗确认删除数据
   *
   * @param model 数据
   */
  async function onDialogDelete(model: Record<string, any>) {
    const d = dialog.create({
      content: '是否确认删除此数据？',
      onPositiveClick: async () => {
        d.loading = true
        await onDelete(model)
        d.loading = false
      },
    })
  }

  /**
   * 编辑数据
   *
   * @param model 数据
   */
  async function onEdit(model: Record<string, any>) {
    formRef.value?.reset?.()
    formOptions.status = 'edit'
    formOptions.show = true
    await fetchInfo(model)
  }

  /**
   * 加载列表或分页数据
   */
  async function onLoad() {
    if (listOptions.pagination) {
      await fetchPage()
    }
    else {
      await fetchList()
    }
  }

  /**
   * 重新加载列表或分页数据
   */
  async function onReload() {
    if (listOptions.pagination) {
      (listOptions.pagination as PaginationProps).page = 1
    }
    await onLoad()
  }

  /**
   * 保存数据
   */
  async function onSave() {
    formOptions.saving = true
    try {
      await formRef.value?.validate?.()
    }
    catch {
      message.warning('表单填写有误')
      return
    }
    finally {
      formOptions.saving = false
    }

    await executeSave(formOptions.model)
  }

  onMounted(() => {
    listOptions.immediate && onLoad()
  })

  provide(`use-crud-${key}-form-ref`, formRef)
  provide(`use-crud-${key}-form`, {
    ...toRefs(formOptions),
    onSave,
  })

  return {
    ...toRefs(listOptions) as any,
    onAdd,
    onBatchDelete,
    onDelete,
    onDialogDelete,
    onEdit,
    onLoad,
    onReload,
    onSave,
  }
}

export function useCrudContext(options: UseCrudContextOptions = {}): UseCrudContextReturn {
  const { key = 'default' } = options
  const formRef = inject<any>(`use-crud-${key}-form-ref`)!
  const form = inject<any>(`use-crud-${key}-form`)!

  return {
    ...form,
    formRef,
  }
}
