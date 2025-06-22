import { mount, flushPromises } from '@vue/test-utils'
import HomePage from '../../src/components/HomePage.vue'
import { nextTick } from 'vue'

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

beforeAll(() => {
  global.IntersectionObserver = MockIntersectionObserver as any
})

describe('HomePage.vue', () => {
  it('renders without crashing', async () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: {
          HeroSection: true,
          RouterLink: true,
          CalendarDays: true,
          Trophy: true,
          Users: true
        }
      }
    })
    
    await nextTick()
    expect(wrapper.exists()).toBe(true)
  })
})
