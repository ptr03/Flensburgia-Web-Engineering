import { mount, flushPromises } from '@vue/test-utils'
import HeroSection from '@/components/HeroSection.vue'
import { nextTick } from 'vue'

describe('HeroSection.vue', () => {
  it('renders title and subtitle and animates them on mount', async () => {
    const wrapper = mount(HeroSection, {
      props: {
        title: 'Mein Heldentitel',
        subtitle: 'Untertitel hier'
      }
    })

    const h1 = wrapper.find('h1')
    const p  = wrapper.find('p')

    expect(h1.text()).toBe('Mein Heldentitel')
    expect(p.text()).toBe('Untertitel hier')

    // starts with animate-target only
    expect(h1.classes()).toContain('animate-target')
    expect(h1.classes()).not.toContain('animate-in')

    await nextTick()
    await flushPromises()

    expect(h1.classes()).toContain('animate-in')
    expect(p.classes()).toContain('animate-in')
  })
})
