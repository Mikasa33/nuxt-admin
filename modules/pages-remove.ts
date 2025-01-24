import type { NuxtPage } from 'nuxt/schema'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'pages-remove',
    configKey: 'pages-remove',
  },

  hooks: {
    'pages:extend': (pages) => {
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = []
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page)
          }
          else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }

      removePagesMatching(/\**\/(?:components|utils)/, pages)
    },
  },

  setup() {
  },
})
