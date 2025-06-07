// tests/unit/Impressum.spec.ts
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import Impressum from '@/components/Impressum.vue'

describe('Impressum.vue', () => {
  it('renders hero title and applies animate-in class on mount', async () => {
  const wrapper = mount(Impressum)
  
  const h1 = wrapper.find('h1.hero-title')
  expect(h1.exists()).toBe(true)
  expect(h1.text()).toBe('Impressum')
  
  // Initial state
  expect(h1.classes()).toContain('animate-target')
  expect(h1.classes()).not.toContain('animate-in')
  
  // Wait for DOM update and animation frame
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(resolve))
  
  // Now should have animate-in
  expect(h1.classes()).toContain('animate-in')
})

  it('contains all required section headings', () => {
    const wrapper = mount(Impressum)

    const headings = wrapper.findAll('h2').map(h => h.text())
    expect(headings).toEqual([
      'Haftungshinweis',
      'Bildnachweise',
      'Betreiber / Herausgeber dieser Website'
    ])

    const subHeadings = wrapper.findAll('h3').map(h => h.text())
    expect(subHeadings).toEqual([
      'Vertretungsberechtigt',
      'Registereintrag',
      'Netzvogt',
      'Umsatzsteuer-ID'
    ])
  })
})
