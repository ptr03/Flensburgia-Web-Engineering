// tests/unit/FlensburgenSection.spec.ts
import { mount, flushPromises } from '@vue/test-utils'
import FlensburgenSection from '@/components/FlensburgenSection.vue'

// @ts-ignore: no types for markdown-it
import MarkdownIt from 'markdown-it'

// Mock the markdown imports to return an object with `default`
vi.mock('@/data/rodeGruetteText.md?raw', () => ({ default: '## Røde Grütt Test\n\nEin kleines Gedicht.' }))
vi.mock('@/data/windjammerText.md?raw', () => ({ default: '## Windjammer Test\n\nEin langer Text.' }))

// Mock lucide icons as simple stubs
vi.mock('lucide-vue-next', () => {
  return {
    Users: { name: 'Users', render: () => null },
    BookOpen: { name: 'BookOpen', render: () => null },
    Award: { name: 'Award', render: () => null },
    Ship: { name: 'Ship', render: () => null }
  }
})

describe('FlensburgenSection.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    wrapper = mount(FlensburgenSection, {
      global: {
        stubs: {
          transition: false,
          'transition-group': false
        }
      }
    })
    await flushPromises()
  })

  it('renders four category buttons', () => {
    const buttons = wrapper.findAll('button.category-button')
    expect(buttons).toHaveLength(4)
    expect(buttons.map(b => b.text())).toEqual([
      'Sassen',
      'Röde Grütt',
      'Erz- & Ehrenschlaraffen',
      'Kilianischer Windjammerorden'
    ])
  })

  it('opens each modal type and shows correct content', async () => {
    const md = new MarkdownIt()

    // 1) Sassen
    await wrapper.find('button.category-button:nth-of-type(1)').trigger('click')
    expect(wrapper.find('.modal-sassen').exists()).toBe(true)
    await wrapper.find('.btn-close').trigger('click')
    expect(wrapper.find('.modal-sassen').exists()).toBe(false)

    // 2) Röde Grütt (text-based assertion)
    await wrapper.find('button.category-button:nth-of-type(2)').trigger('click')
    const poemContent = wrapper.find('.modal-text.poem .text-content').text()
    expect(poemContent).toContain('Røde Grütt Test')
    expect(poemContent).toContain('Ein kleines Gedicht.')
    await wrapper.find('.btn-close').trigger('click')

    // 3) Erz- & Ehrenschlaraffen
    await wrapper.find('button.category-button:nth-of-type(3)').trigger('click')
    expect(wrapper.find('.modal-schlaraffen-selection').exists()).toBe(true)
    // Erzschlaraffen
    await wrapper.find('button.sub-button:nth-of-type(1)').trigger('click')
    expect(wrapper.find('.modal-schlaraffen-grid h2').text()).toBe('Erzschlaraffen')
    await wrapper.find('.btn-back').trigger('click')
    // Ehrenschlaraffen
    await wrapper.find('button.sub-button:nth-of-type(2)').trigger('click')
    expect(wrapper.find('.modal-schlaraffen-grid h2').text()).toBe('Ehrenschlaraffen')
    await wrapper.find('.btn-close').trigger('click')

    // 4) Kilianischer Windjammerorden
    await wrapper.find('button.category-button:nth-of-type(4)').trigger('click')
    const windContent = wrapper.find('.modal-text.modal-windjammer .text-content').text()
    expect(windContent).toContain('Windjammer Test')
    expect(windContent).toContain('Ein langer Text.')
    await wrapper.find('.btn-close').trigger('click')
  })
})
