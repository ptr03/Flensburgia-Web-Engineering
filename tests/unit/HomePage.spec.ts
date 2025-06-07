// tests/unit/HomePage.spec.ts
import { shallowMount } from '@vue/test-utils'
import HomePage from '@/components/HomePage.vue'

describe('HomePage.vue', () => {
  beforeAll(() => {
    // stub IntersectionObserver globally for this suite
    // @ts-ignore
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  it('renders the HeroSection stub', () => {
    const wrapper = shallowMount(HomePage, {
      global: {
        stubs: {
          'hero-section': true,
          'about-section': true,
        },
      },
    })
    expect(wrapper.find('hero-section-stub').exists()).toBe(true)
  })
})
