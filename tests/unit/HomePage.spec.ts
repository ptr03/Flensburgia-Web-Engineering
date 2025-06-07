// tests/unit/HomePage.spec.ts
import { shallowMount } from '@vue/test-utils'
import HomePage from '@/components/HomePage.vue'

describe('HomePage.vue', () => {
  it('renders the HeroSection stub', () => {
    const wrapper = shallowMount(HomePage)
    expect(wrapper.find('hero-section-stub').exists()).toBe(true)
  })
})
