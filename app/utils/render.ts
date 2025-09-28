import { Icon } from '#components'
import { isString } from 'lodash-es'

export function renderIcon(props: string | { name: string, mode?: 'svg' | 'css', size?: number | string }) {
  return () => h(Icon, isString(props) ? { name: props } : props)
}

const mimeOptions = [
  { value: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'], icon: 'i-icon-park-outline:image-files' },
  { value: ['audio/mpeg', 'audio/mp3', 'audio/x-mpeg'], icon: 'i-icon-park-outline:file-music' },
  { value: ['video/mp4', 'video/x-msvideo', 'video/x-matroska'], icon: 'i-icon-park-outline:video-file' },
  { value: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'], icon: 'i-icon-park-outline:file-word' },
  { value: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'], icon: 'i-icon-park-outline:excel' },
  { value: ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint'], icon: 'i-icon-park-outline:file-ppt' },
  { value: ['application/pdf'], icon: 'i-icon-park-outline:file-pdf-one' },
  { value: ['application/zip', 'application/x-zip-compressed'], icon: 'i-icon-park-outline:file-zip' },
]

export function renderMimeIcon(value: string) {
  const item = mimeOptions.find(item => item.value.includes(value))
  return () => h(Icon, { name: item?.icon ?? 'i-icon-park-outline:file-question' })
}
