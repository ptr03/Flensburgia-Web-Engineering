// tests/setupVitest.ts
// @ts-nocheck
import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: './tests/setupVitest.ts',
    environment: 'jsdom'
  }
})


class IO {
  cb: any
  constructor(cb: any) {
    this.cb = cb
  }
  observe(el: Element) {
    this.cb([{ target: el, isIntersecting: true, intersectionRatio: 1 }])
  }
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('IntersectionObserver', IO)

config.global.stubs = {
  'router-link': true,
  'router-view': true,
}
config.global.mocks = {
  $mq: { isMobile: true }
}
