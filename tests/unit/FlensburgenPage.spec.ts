import { mount } from '@vue/test-utils'
import FlensburgenPage from '@/components/FlensburgenPage.vue'
import FlensburgenSection from '@/components/FlensburgenSection.vue'

// stub out the SVG-icons
vi.mock('lucide-vue-next', () => ({
  Users: { template: '<svg />' },
  BookOpen: { template: '<svg />' },
  Award: { template: '<svg />' },
  Ship: { template: '<svg />' },
}))

describe('FlensburgenPage.vue', () => {
  it('renders hero title and subtitle', () => {
    const wrapper = mount(FlensburgenPage)
    const title = wrapper.find('.flense-hero .section-title')
    const subtitle = wrapper.find('.flense-hero .section-subtitle')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Die Flensburgen')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toContain('Entdecke unsere drei traditionsreichen')
  })

  it('includes the FlensburgenSection component', () => {
    const wrapper = mount(FlensburgenPage)
    expect(wrapper.findComponent(FlensburgenSection).exists()).toBe(true)
  })
})
