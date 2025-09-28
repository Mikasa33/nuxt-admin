import type { DialogOptions, DialogReactive, PaginationProps } from 'naive-ui'
import { cloneDeep } from 'lodash-es'

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
  onDeleteSuccess?: (body: Record<string, any>) => void | Promise<void>
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
  onBatchDelete: (ids: number[], body?: Record<string, any>) => Promise<void>
  onDelete: (model: Record<string, any>, body?: Record<string, any>) => Promise<void>
  onDialogDelete: (model: Record<string, any>, options?: DialogOptions) => DialogReactive
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
  onSave: UseCrudReturn['onSave']
}

export function useCrud(options: UseCrudOptions): UseCrudReturn {
  const message = useMessage()
  const dialog = useCustomDialog()

  const {
    baseUrl,
    apis,
    key = 'default',
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
          onUpdatePage: async (page: number) => {
            (listOptions.pagination as PaginationProps)!.page = page
            await onLoad()
          },
          onUpdatePageSize: async (pageSize: number) => {
            (listOptions.pagination as PaginationProps)!.pageSize = pageSize
            await onLoad()
          },
        },
  })

  const formRef = ref()
  const formOptions = reactive<InternalFormOptions>({
    loading: false,
    model: {},
    saving: false,
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
      await $customFetch(`${baseUrl}${apis?.delete ?? API.DELETE}`, {
        method: 'DELETE',
        body,
      })

      if (!onDeleteSuccess) {
        message.success(`${body.ids.length > 1 ? '批量' : ''}删除成功`)
      }

      // 如果分页配置存在
      if (listOptions.pagination) {
        const pagination = listOptions.pagination as PaginationProps
        // 如果当前页码乘以每页数量小于等于总数减去删除数量，则设置页码为新的最后一页
        if (pagination.page! * pagination.pageSize! <= pagination.itemCount! - body.ids.length) {
          pagination.page = Math.ceil(pagination.itemCount! - body.ids.length / pagination.pageSize!)
        }
      }

      await onLoad()

      if (onDeleteSuccess) {
        await onDeleteSuccess(body)
      }
    }
    catch (error: any) {
      if (onDeleteError) {
        await onDeleteError(error)
      }
      else {
        message.error(error.message)
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
    let cloneBody = cloneDeep(body)
    if (onBeforeSave) {
      cloneBody = await onBeforeSave(cloneBody) ?? cloneBody
    }

    formOptions.saving = true
    try {
      const data = await $customFetch<Record<string, any>>(`${baseUrl}${formOptions.status === 'edit' ? apis?.update ?? API.UPDATE : apis?.add ?? API.ADD}`, {
        method: formOptions.status === 'edit' ? 'PUT' : 'POST',
        body: cloneBody,
      })

      if (onSaveSuccess) {
        await onSaveSuccess(data)
      }
      else {
        message.success('保存成功')
      }

      formOptions.show = false

      await onLoad()
    }
    catch (error: any) {
      if (onSaveError) {
        await onSaveError(error)
      }
      else {
        message.error(error.message)
      }
    }
    finally {
      formOptions.saving = false
    }
  }

  /**
   * 获取数据
   *
   * @param model 数据
   */
  async function fetchInfo(model: Record<string, any>) {
    formOptions.loading = true
    formOptions.model = {}
    try {
      const data = await $customFetch<Record<string, any>>(`${baseUrl}${apis?.info ?? API.INFO}`, {
        params: {
          id: model.id,
        },
      })

      formOptions.model = await onFetchInfoSuccess?.(data) ?? data
    }
    catch (error: any) {
      if (onFetchInfoError) {
        await onFetchInfoError(error)
      }
      else {
        message.error(error.message)
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

      const data = await $customFetch<Record<string, any>[]>(`${baseUrl}${apis?.list ?? API.LIST}`, { params })
      listOptions.data = (await onFetchListSuccess?.(data)) ?? data
    }
    catch (error: any) {
      if (onFetchListError) {
        await onFetchListError(error)
      }
      else {
        message.error(error.message)
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

      const data = await $customFetch<ListData>(`${baseUrl}${apis?.page ?? API.PAGE}`, { params })

      listOptions.data = (await onFetchListSuccess?.(data)) ?? data.list;
      (listOptions.pagination as PaginationProps).itemCount = data.total
    }
    catch (error: any) {
      if (onFetchListError) {
        await onFetchListError(error)
      }
      else {
        message.error(error.message)
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
    formOptions.status = 'add'
    formOptions.show = true
    formOptions.model = defaultModel ?? {} as any
  }

  /**
   * 批量删除数据
   *
   * @param ids 数据主键数组
   */
  async function onBatchDelete(ids: number[], body?: Record<string, any>) {
    await executeDelete({ ids, ...body })
  }

  /**
   * 删除数据
   *
   * @param model 数据
   */
  async function onDelete(model: Record<string, any>, body?: Record<string, any>) {
    await executeDelete({ ids: [model.id], ...body })
  }

  /**
   * 弹窗确认删除数据
   *
   * @param model 数据
   */
  function onDialogDelete(model: Record<string, any>, options: DialogOptions = {}) {
    const d = dialog.create({
      content: '是否确认删除此数据？',
      ...options,
      onPositiveClick: async () => {
        d.loading = true
        await onDelete(model)
        d.loading = false
      },
    })
    return d
  }

  /**
   * 编辑数据
   *
   * @param model 数据
   */
  async function onEdit(model: Record<string, any>) {
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
    formRef.value.validate(async (errors: any) => {
      if (errors) {
        message.error('表单填写有误')
        return
      }

      await executeSave(formOptions.model)
    })
  }

  onMounted(async () => {
    listOptions.immediate && (await onLoad())
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
