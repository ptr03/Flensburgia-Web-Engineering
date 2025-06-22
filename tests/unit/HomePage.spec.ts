import { mount, flushPromises } from '@vue/test-utils'
import HomePage from '@/pages/HomePage.vue'
import { nextTick } from 'vue'

describe('HomePage.vue', () => {
  it('renders the HeroSection stub and animates it', async () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: { 'HeroSection': true }
      }
    })

    // find the stub
    const heroStub = wrapper.findComponent({ name: 'HeroSection' })
    expect(heroStub.exists()).toBe(true)

    // it should have animate-target on mount
    expect(heroStub.classes()).toContain('animate-target')
    expect(heroStub.classes()).not.toContain('animate-in')

    // after onMounted + IntersectionObserver
    await nextTick()
    await flushPromises()

    expect(heroStub.classes()).toContain('animate-in')
  })
})
