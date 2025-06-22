// Stub out IntersectionObserver so it doesn't error in tests
;(globalThis as any).IntersectionObserver = class {
  constructor(cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { mount, flushPromises } from '@vue/test-utils'
import SippungsfolgePage from '../../src/components/SippungsfolgePage.vue'
import SippungsfolgeSection from '../../src/components/SippungsfolgeSection.vue'

// Stub the Calendar icon
vi.mock('lucide-vue-next', () => ({
  Calendar: { name: 'Calendar', render: () => null }
}))

describe('SippungsfolgePage.vue', () => {
  it('renders hero title, subtitle, and includes the section', async () => {
    const wrapper = mount(SippungsfolgePage, {
      global: { stubs: ['Teleport'] }
    })
    await flushPromises()

    const title = wrapper.find('h1.hero-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Sippungsfolge')

    const subtitle = wrapper.find('h2.welcome-text')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Unsere Treffen von April bis Oktober')

    expect(wrapper.findComponent(SippungsfolgeSection).exists()).toBe(true)
  })
})
