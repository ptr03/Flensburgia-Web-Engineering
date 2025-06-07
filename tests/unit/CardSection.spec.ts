// tests/unit/CardSection.spec.ts

// Make sure IntersectionObserver exists so mounting doesn't throw
;(globalThis as any).IntersectionObserver = class {
  constructor(cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import CardSection from '../../src/components/CardSection.vue'

describe('CardSection.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>

  beforeEach(() => {
    wrapper = shallowMount(CardSection, {
      global: { stubs: { 'router-link': RouterLinkStub } }
    })
  })

  it('renders exactly three cards', () => {
    expect(wrapper.findAll('.card')).toHaveLength(3)
  })

  it('renders the correct titles and descriptions', () => {
    const cards = wrapper.findAll('.card')
    const expected = [
      {
        title: 'Dictionary',
        desc: 'Explore our comprehensive cultural terminology database',
      },
      {
        title: 'Timeline',
        desc: "Journey through our region's historical milestones",
      },
      {
        title: 'Tour',
        desc: 'Discover guided experiences of cultural landmarks',
      },
    ]

    cards.forEach((card, i) => {
      expect(card.find('h3.card-title').text()).toBe(expected[i].title)
      expect(card.find('p.card-description').text()).toBe(expected[i].desc)
    })
  })
})
