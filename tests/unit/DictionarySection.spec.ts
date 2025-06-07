// tests/unit/DictionarySection.spec.ts

// stub IntersectionObserver so mount never errors
;(globalThis as any).IntersectionObserver = class {
  constructor(cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { vi } from 'vitest'
import DictionarySection from '../../src/components/DictionarySection.vue'

describe('DictionarySection.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    // fake timers for the featuredList carousel
    vi.useFakeTimers()
    wrapper = mount(DictionarySection)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('→ landing view: title, description, buttons, and search bar', () => {
    // 1. title
    expect(wrapper.find('h1.landing-title').text())
      .toBe('Schlaraffisches Wörterbuch')
    // 2. description is present
    expect(wrapper.find('p.landing-desc').exists()).toBe(true)
    // 3. two landing buttons
    const btns = wrapper.findAll('button.landing-btn')
    expect(btns).toHaveLength(2)
    expect(btns[0].text()).toBe('Kategorien')
    expect(btns[1].text()).toBe('Zufälliger Begriff')
    // 4. landing search input
    expect(wrapper.find('input.landing-search-bar').exists()).toBe(true)
  })

  it('→ landing search: shows results when typing and clears when empty', async () => {
    const input = wrapper.find('input.landing-search-bar')
    // initially no results
    expect(wrapper.findAll('.result-card')).toHaveLength(0)

    // type a letter
    await input.setValue('a')
    await nextTick()
    expect(wrapper.findAll('.result-card').length).toBeGreaterThan(0)

    // clear input
    await input.setValue('')
    await nextTick()
    expect(wrapper.findAll('.landing-results').length).toBe(0)
  })

  it('→ random term: show and clear', async () => {
    // force first dictionary entry
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const randomBtn = wrapper.findAll('button.landing-btn')[1]
    await randomBtn.trigger('click')
    await nextTick()

    const preview = wrapper.find('.random-preview')
    expect(preview.exists()).toBe(true)
    expect(preview.find('.preview-term').exists()).toBe(true)

    // clear random
    await wrapper.find('button.btn-close-preview').trigger('click')
    expect(wrapper.find('.random-preview').exists()).toBe(false)
    vi.restoreAllMocks()
  })

  it('→ featured teaser cycles every 4s', async () => {
    const firstTerm = wrapper.find('.featured-term').text()
    // advance 4 seconds
    vi.advanceTimersByTime(4000)
    await nextTick()
    const secondTerm = wrapper.find('.featured-term').text()
    expect(secondTerm).not.toBe(firstTerm)
  })

  it('→ navigates to categories and back to landing', async () => {
    // click "Kategorien"
    await wrapper.find('button.landing-btn').trigger('click')
    await nextTick()
    expect(wrapper.find('.categories-view').exists()).toBe(true)

    // click back
    await wrapper.find('button.back-button').trigger('click')
    await nextTick()
    expect(wrapper.find('.landing-view').exists()).toBe(true)
  })

  it('→ categories view: has at least one category card and selecting it opens terms view', async () => {
    // go to categories
    await wrapper.find('button.landing-btn').trigger('click')
    await nextTick()
    const cards = wrapper.findAll('.category-card')
    expect(cards.length).toBeGreaterThan(0)

    // click first
    const firstCat = cards[0].text()
    await cards[0].trigger('click')
    await nextTick()

    expect(wrapper.find('.terms-view').exists()).toBe(true)
    // heading matches category name
    expect(wrapper.find('.section-heading').text()).toBe(firstCat)
  })

  it('→ terms view: search filters entries, toggle expands and shows details modal', async () => {
    // navigate to terms
    await wrapper.find('button.landing-btn').trigger('click')
    await nextTick()
    await wrapper.find('.category-card').trigger('click')
    await nextTick()

    // search bar
    const searchInput = wrapper.find('input.search-bar-term')
    await searchInput.setValue('a')
    await nextTick()
    // filtered list
    const entries = wrapper.findAll('.dictionary-card')
    expect(entries.length).toBeGreaterThan(0)

    // toggle first entry
    const header = entries[0].find('.card-header')
    await header.trigger('click')
    await nextTick()
    expect(entries[0].classes()).toContain('is-expanded')

    // click Details button inside expanded card
    await entries[0].find('button.details-button').trigger('click')
    await nextTick()
    // modal opens
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    // close modal by clicking overlay
    await wrapper.find('.modal-overlay').trigger('click')
    await nextTick()
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })
})
