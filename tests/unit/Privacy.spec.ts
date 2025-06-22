import { mount, flushPromises } from '@vue/test-utils'
import Privacy from '../../src/components/Privacy.vue'

describe('Privacy.vue', () => {
  it('renders hero title and applies animate-in class on mount', async () => {
    const wrapper = mount(Privacy)
    
    await flushPromises() // Wait for all promises/DOM updates
    
    const h1 = wrapper.find('h1.hero-title')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe('Privacy Policy')
    expect(h1.classes()).toContain('animate-in')
  })

  it('renders all expected section headings', () => {
    const wrapper = mount(Privacy)

    const headings = wrapper.findAll('h2').map(h => h.text())
    expect(headings).toEqual([
      'Geltungsbereich',
      'Zugriffsdaten',
      'Cookies',
      'Umgang mit personenbezogenen Daten',
      'Umgang mit Kontaktdaten',
      'Umgang mit Kommentaren und Beiträgen',
      'Rechte des Nutzers: Auskunft, Berichtigung und Löschung'
    ])
  })
})
