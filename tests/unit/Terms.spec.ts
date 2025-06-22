import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils'
import Terms from '../../src/components/Terms.vue'

describe('Terms.vue', () => {
  it('renders the hero title and applies animate-in on mount', async () => {
    const wrapper = mount(Terms, {
      global: {
        stubs: { 'router-link': RouterLinkStub }
      }
    })
    
    await flushPromises()
    
    const h1 = wrapper.find('h1.hero-title')
    expect(h1.exists()).toBe(true)
    expect(h1.classes()).toContain('animate-in')
  })

  it('renders all section headings in order', async () => {
    const wrapper = mount(Terms, {
      global: { stubs: { 'router-link': RouterLinkStub } }
    })
    
    await flushPromises()
    
    const headings = wrapper.findAll('h2, h3').map(h => h.text())
    expect(headings).toEqual([
      'Anwendungsbereich',
      'Vertragsabschluss',
      'Leistungsbeschreibung',
      'Haftung',
      'Datenschutz',
      'Änderung der AGB'
    ])
  })

  it('includes a router-link to /privacy inside the Datenschutz paragraph', async () => {
    const wrapper = mount(Terms, {
      global: { stubs: { 'router-link': RouterLinkStub } }
    })
    
    await flushPromises()
    
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props().to).toBe('/privacy')
    expect(link.text()).toBe('Privacy Policy')
  })
})