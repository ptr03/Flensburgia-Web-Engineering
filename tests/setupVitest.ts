// tests/setupVitest.ts
import { vi } from 'vitest'
import { config } from '@vue/test-utils'

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

config.global.stubs = {
  'router-link': true,
  'router-view': true,
}
