// tests/unit/HomePage.spec.ts
import { mount } from '@vue/test-utils'
import HomePage from '@/components/HomePage.vue'

describe('HomePage', () => {
  it('renders without crashing', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
