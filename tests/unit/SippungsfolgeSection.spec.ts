// Stub IntersectionObserver so it doesn't blow up in JSDOM
;(globalThis as any).IntersectionObserver = class {
  constructor(cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { mount, flushPromises } from '@vue/test-utils'
import SippungsfolgeSection from '@/components/SippungsfolgeSection.vue'
import SippungsModal from '@/components/SippungsModal.vue'

// Mock the JSON data import
vi.mock('@/data/sippungsfolge.json', () => ({
  default: [
    { id: '1', date: '10.04.2025', title: 'April-Treffen' },
    { id: '2', date: '15.05.2025', title: 'Mai-Zunft' }
  ]
}))

// Stub out the modal child
vi.mock('@/components/SippungsModal.vue', () => ({
  default: { name: 'SippungsModal', render: () => null }
}))

describe('SippungsfolgeSection.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    wrapper = mount(SippungsfolgeSection, {
      global: { stubs: ['Teleport'] }
    })
    await flushPromises()
  })

  it('renders two month groups in descending order', () => {
    const groups = wrapper.findAll('.month-group')
    expect(groups).toHaveLength(2)

    // Newest first: Mai then April
    expect(groups[0].find('h3').text()).toContain('Mai')
    expect(groups[1].find('h3').text()).toContain('April')
  })

  it('opens the modal when a card is clicked', async () => {
    await wrapper.find('button.sippungs-card').trigger('click')
    await flushPromises()
    expect(wrapper.findComponent(SippungsModal).exists()).toBe(true)
  })

  it('closes the modal when the modal emits "close"', async () => {
    await wrapper.find('button.sippungs-card').trigger('click')
    await flushPromises()

    const modal = wrapper.findComponent(SippungsModal)
    expect(modal.exists()).toBe(true)

    await modal.vm.$emit('close')
    await flushPromises()
    expect(wrapper.findComponent(SippungsModal).exists()).toBe(false)
  })
})
