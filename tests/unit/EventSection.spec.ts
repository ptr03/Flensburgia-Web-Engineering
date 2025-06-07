// tests/unit/EventSection.spec.ts

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import EventSection from '../../src/components/EventSection.vue'

// Stub IntersectionObserver so mount never errors
;(globalThis as any).IntersectionObserver = class {
  constructor(cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('EventSection.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(EventSection)
  })

  it('→ shows event buttons when events list is non-empty', async () => {
    // overwrite the events ref with one fake event
    ;(wrapper.vm as any).events = [
      {
        id: 1,
        title: 'Fake Event',
        date: '2025-01-01',
        description: 'Desc',
        image: null
      }
    ]
    await nextTick()

    const buttons = wrapper.findAll('button.event-button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0].text()).toBe('Fake Event')
    expect(wrapper.find('.detail-container').exists()).toBe(false)

    // detail→back flow
    await buttons[0].trigger('click')
    await nextTick()
    expect(wrapper.find('.detail-container').exists()).toBe(true)

    await wrapper.find('button.btn-back').trigger('click')
    await nextTick()
    expect(wrapper.find('.horizontal-scroll-wrapper').exists()).toBe(true)
  })

  it('→ shows no-events message when events list is empty', async () => {
    ;(wrapper.vm as any).events = []
    await nextTick()

    expect(wrapper.find('.no-events-message').exists()).toBe(true)
    expect(wrapper.find('.horizontal-scroll-wrapper').exists()).toBe(false)
  })

  it('→ shows formatted date and no-image when image is null', async () => {
    ;(wrapper.vm as any).events = [
      {
        id: 2,
        title: 'No Image Event',
        date: '2025-02-03',
        description: 'Desc2',
        image: null
      }
    ]
    await nextTick()

    await wrapper.find('button.event-button').trigger('click')
    await nextTick()

    // should not render <img>
    expect(wrapper.find('img.detail-image').exists()).toBe(false)
    // formatted date branch
    expect(wrapper.find('time.detail-date').text()).toBe('03. Februar 2025')
  })

  it('→ renders image tag when getImageUrl returns a URL', async () => {
    // stub the helper
    ;(wrapper.vm as any).getImageUrl = () => 'http://example.com/foo.png'

    ;(wrapper.vm as any).events = [
      {
        id: 3,
        title: 'Has Image Event',
        date: '2025-03-04',
        description: 'Desc3',
        image: 'foo.png'
      }
    ]
    await nextTick()

    await wrapper.find('button.event-button').trigger('click')
    await nextTick()

    const img = wrapper.find('img.detail-image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('http://example.com/foo.png')
    expect(img.attributes('alt')).toBe('Has Image Event')
  })
})
