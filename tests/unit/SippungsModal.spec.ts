// tests/unit/SippungsModal.spec.ts
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SippungsModal from '../../src/components/SippungsModal.vue'

describe('SippungsModal.vue', () => {
  const baseProps = {
    item: {
      title: 'Test Sippung',
      date: '2025-06-10',
      description: '<p>Ein <strong>toller</strong> Test.</p>'
    }
  }

  it('renders title, date and description', () => {
    const wrapper = mount(SippungsModal, {
      props: { ...baseProps, images: [] },
      global: { stubs: { Teleport: true } }
    })

    expect(wrapper.find('h3').text()).toBe('Test Sippung')
    expect(wrapper.find('.date').text()).toBe('2025-06-10')
    expect(wrapper.find('.description').html()).toContain(
      '<p>Ein <strong>toller</strong> Test.</p>'
    )
  })

  it('shows placeholder when no images provided', () => {
    const wrapper = mount(SippungsModal, {
      props: { ...baseProps, images: [] },
      global: { stubs: { Teleport: true } }
    })

    const imgs = wrapper.findAll('.gallery img')
    expect(imgs).toHaveLength(1)
    expect(imgs[0].attributes('src')).toMatch(/placeholder\.jpg$/)
    expect(imgs[0].attributes('alt')).toBe('Kein Bild verfügbar')
  })

  it('renders all provided images and allows zoom', async () => {
    const images = ['/img1.jpg', '/img2.png']
    const wrapper = mount(SippungsModal, {
      props: { ...baseProps, images },
      global: { stubs: { Teleport: true } }
    })

    const thumbs = wrapper.findAll('.gallery img')
    expect(thumbs.map(i => i.attributes('src'))).toEqual(images)

    // open zoom on first image
    await thumbs[0].trigger('click')
    await nextTick()
    expect(wrapper.find('.zoom-backdrop').isVisible()).toBe(true)
    expect(wrapper.find('.zoom-img').attributes('src')).toBe(images[0])

    // close zoom
    await wrapper.find('.zoom-close').trigger('click')
    await nextTick()
    expect(wrapper.find('.zoom-backdrop').exists()).toBe(false)
  })

  it('emits close when backdrop or close button is clicked', async () => {
    const wrapper = mount(SippungsModal, {
      props: { ...baseProps, images: ['/i.jpg'] },
      global: { stubs: { Teleport: true } }
    })

    // clicking the × button inside modal
    await wrapper.find('button.close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)

    // clicking on the backdrop (outside of .modal)
    await wrapper.find('.backdrop').trigger('click.self')
    expect(wrapper.emitted('close')).toHaveLength(2)
  })
})
