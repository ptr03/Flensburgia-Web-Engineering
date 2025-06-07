import { mount } from '@vue/test-utils'
import NewsletterPage from '../../src/components/NewsletterPage.vue' // Updated path
import NewsletterSection from '@/components/NewsletterSection.vue'
import { describe, it, expect } from 'vitest'

describe('NewsletterPage.vue', () => {
  it('renders the hero section with correct content', () => {
    const wrapper = mount(NewsletterPage)
    
    const hero = wrapper.find('.hero-plain')
    expect(hero.exists()).toBe(true)
    
    const title = hero.find('.hero-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Unser Newsletter')
    
    const subtitle = hero.find('.welcome-text')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Verpasse keine Neuigkeiten mehr!')
  })

  it('includes the NewsletterSection component', () => {
    const wrapper = mount(NewsletterPage)
    expect(wrapper.findComponent(NewsletterSection).exists()).toBe(true)
  })
})