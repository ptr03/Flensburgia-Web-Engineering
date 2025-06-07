import { mount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'
import { describe, it, expect } from 'vitest'
import { RouterLinkStub } from '@vue/test-utils'

describe('Footer.vue', () => {
  it('renders footer with correct content', () => {
    const wrapper = mount(Footer, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    // Check footer structure
    expect(wrapper.find('footer.footer').exists()).toBe(true)
    expect(wrapper.find('.container.footer-content').exists()).toBe(true)
    
    // Brand section
    const brandSection = wrapper.find('.footer-brand')
    expect(brandSection.find('h4.footer-title').text()).toBe('Flensburgia')
    expect(brandSection.find('p.footer-copy').text())
      .toBe('© 2025 Schlaraffia Flensburgia. Alle Rechte vorbehalten.')
    
    // Links section
    const linksSection = wrapper.find('.footer-links')
    expect(linksSection.find('h4.footer-title').text()).toBe('Rechtliches')
    
    const links = linksSection.findAllComponents(RouterLinkStub)
    expect(links).toHaveLength(3)
    expect(links[0].text()).toBe('Impressum')
    expect(links[1].text()).toBe('Terms & Conditions')
    expect(links[2].text()).toBe('Privacy Policy')
  })

  it('has correct router links', () => {
    const wrapper = mount(Footer, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    const links = wrapper.findAllComponents(RouterLinkStub)
    
    // Impressum link
    expect(links[0].props().to).toBe('/impressum')
    
    // Terms link
    expect(links[1].props().to).toBe('/terms')
    
    // Privacy link
    expect(links[2].props().to).toBe('/privacy')
  })
})