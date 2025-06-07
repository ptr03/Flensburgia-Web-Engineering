import { shallowMount } from '@vue/test-utils'
import HomePage from '@/components/HomePage.vue'

describe('HomePage.vue', () => {
  beforeAll(() => {
    // Stub IntersectionObserver globally for this suite
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
          'router-link': true, // Add this stub for `router-link`
        },
      },
    })
    expect(wrapper.find('hero-section-stub').exists()).toBe(true)
  })
})