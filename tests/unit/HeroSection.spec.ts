import { mount } from '@vue/test-utils'
import HeroSection from '../../src/components/HeroSection.vue'
import { nextTick } from 'vue'
import { vi } from 'vitest'

describe('HeroSection.vue', () => {
  it('renders title and subtitle and animates them on mount', async () => {
    const wrapper = mount(HeroSection, {
      props: {
        title: 'Mein Heldentitel',
        subtitle: 'Untertitel hier'
      },
      global: {
        stubs: {
          Info: true,
          List: true,
          PhoneCall: true,
          RouterLink: true
        }
      },
      attachTo: document.body
    })

    const h1 = wrapper.find('.hero-title')
    const h2 = wrapper.find('.welcome-text')

    // Initial state
    expect(h1.text()).toBe('Mein Heldentitel')
    expect(h2.text()).toBe('Untertitel hier')
    expect(h1.classes()).not.toContain('animate-in')
    expect(h2.classes()).not.toContain('animate-in')

    // Instead of manually calling setup, let Vue handle the lifecycle
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 100)) // Short delay
    
    // Check classes after animation
    expect(h1.classes()).toContain('animate-in')
    expect(h2.classes()).toContain('animate-in')
  })
})