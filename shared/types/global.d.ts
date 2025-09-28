import type { DialogApi, LoadingBarApi, MessageApi, ModalApi, NotificationApi } from 'naive-ui'

declare global {
  const $dialog: DialogApi
  const $loadingBar: LoadingBarApi
  const $message: MessageApi
  const $modal: ModalApi
  const $notification: NotificationApi

  interface Window {
    $dialog: DialogApi
    $loadingBar: LoadingBarApi
    $message: MessageApi
    $modal: ModalApi
    $notification: NotificationApi
  }
}

export {}
