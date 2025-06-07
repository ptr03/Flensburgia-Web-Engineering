// tests/unit/EventPage.spec.ts

// Stub IntersectionObserver so animate-target logic doesn’t error
;(globalThis as any).IntersectionObserver = class {
  constructor(cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import EventPage from '../../src/components/EventPage.vue'
import EventSection from '../../src/components/EventSection.vue'

describe('EventPage.vue', () => {
  it('renders hero titles and adds animate-in classes on mount', async () => {
    const wrapper = mount(EventPage, {
      attachTo: document.body  // ensure document.querySelectorAll finds them
    })

    // before nextTick no animate-in
    expect(wrapper.find('.hero-title').classes()).not.toContain('animate-in')
    expect(wrapper.find('.welcome-text').classes()).not.toContain('animate-in')

    // simulate onMounted + nextTick
    await nextTick()

    // now they should have been given the class
    expect(wrapper.find('.hero-title').classes()).toContain('animate-in')
    expect(wrapper.find('.welcome-text').classes()).toContain('animate-in')
  })

  it('renders the EventSection component', () => {
    const wrapper = mount(EventPage)
    expect(wrapper.findComponent(EventSection).exists()).toBe(true)
  })
})
