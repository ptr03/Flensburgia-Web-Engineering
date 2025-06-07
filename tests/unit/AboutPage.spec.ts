// tests/unit/AboutPage.spec.ts
import { mount } from '@vue/test-utils'
import AboutPage from '../../src/components/AboutPage.vue'

describe('AboutPage.vue', () => {
  let wrapper = mount(AboutPage, {
    global: {
      stubs: {
        'router-link': { template: '<a><slot/></a>' },
        AboutSection: true,
      },
    },
  })

  it('renders the AboutSection exactly once', () => {
    expect(wrapper.findComponent({ name: 'AboutSection' }).exists()).toBe(true)
  })

  it('renders all timeline items', () => {
    // the component defines 5 entries in its own script-setup
    const items = wrapper.findAll('[data-testid="about-section"] .timeline-item')
    expect(items).toHaveLength(5)
    // quick sanity-check on the first and last year
    expect(items[0].find('h3').text()).toBe('1859')
    expect(items[4].find('h3').text()).toBe('2020')
  })

  it('renders exactly two link cards with correct paths and labels', () => {
    const cards = wrapper.findAll('.link-card')
    expect(cards).toHaveLength(2)

    expect(cards[0].attributes('to')).toBe('/die-flensburgen')
    expect(cards[0].find('span').text()).toBe('Die Flensburgen')

    expect(cards[1].attributes('to')).toBe('/sippungsfolge')
    expect(cards[1].find('span').text()).toBe('Sassen')
  })
})
