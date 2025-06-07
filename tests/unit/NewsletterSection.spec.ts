import { mount } from '@vue/test-utils'
import NewsletterSection from '@/components/NewsletterSection.vue'
import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'

describe('NewsletterSection.vue', () => {
  it('renders section with correct content', () => {
    const wrapper = mount(NewsletterSection)
    
    // Title
    const title = wrapper.find('.section-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Der Hofstaat‐Bote der Erz- & Ehrenschlaraffen')
    
    // Subtitle
    const subtitle = wrapper.find('.section-subtitle')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toContain('Trage Dich ein und empfange')
    
    // Benefits list
    const benefits = wrapper.findAll('.benefits-list li')
    expect(benefits).toHaveLength(3)
    expect(benefits[0].text()).toContain('Erlesene Schlaraffen-Notizen')
    expect(benefits[1].text()).toContain('Einladungen zu Kaffeeklatsch-Zünften')
    expect(benefits[2].text()).toContain('Zugang zu Sonderkulinarien')
    
    // Form elements
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('In den Boten eintragen')
  })

  it('validates email input correctly', async () => {
    const wrapper = mount(NewsletterSection)
    const emailInput = wrapper.find('input[type="email"]')
    const button = wrapper.find('button')
    
    // Test empty email
    await emailInput.setValue('')
    await button.trigger('click')
    await nextTick()
    
    let message = wrapper.find('.message')
    expect(message.exists()).toBe(true)
    expect(message.text()).toContain('Oh weh! Bitte gib eine gültige E-Mail-Adresse ein')
    expect(message.classes()).toContain('message-error')
    
    // Test invalid email
    await emailInput.setValue('invalid-email')
    await button.trigger('click')
    await nextTick()
    
    message = wrapper.find('.message')
    expect(message.exists()).toBe(true)
    expect(message.text()).toContain('gültige E-Mail-Adresse')
    expect(message.classes()).toContain('message-error')
    
    // Test valid email
    await emailInput.setValue('valid@example.com')
    await button.trigger('click')
    await nextTick() // Ensure Vue updates the DOM
    
    message = wrapper.find('.message')
    expect(message.exists()).toBe(true)
    expect(message.text()).toContain('Dein Kürschner hat Dich im Boten verzeichnet')
    expect(message.classes()).toContain('message-success')
    
    // Email should be cleared after successful submission
    expect(wrapper.vm.email).toBe('')
  })

  it('updates email model correctly', async () => {
    const wrapper = mount(NewsletterSection)
    const emailInput = wrapper.find('input[type="email"]')
    
    const testEmail = 'test@example.com'
    await emailInput.setValue(testEmail)
    
    expect(wrapper.vm.email).toBe(testEmail)
  })

  it('clears message when typing after error', async () => {
    const wrapper = mount(NewsletterSection)
    const emailInput = wrapper.find('input[type="email"]')
    const button = wrapper.find('button')
    
    // Trigger error
    await button.trigger('click')
    await nextTick()
    expect(wrapper.find('.message').exists()).toBe(true)
    
    // Start typing
    await emailInput.setValue('a')
    await nextTick()
    
    // Message should be cleared
    expect(wrapper.find('.message').exists()).toBe(false)
  })
})