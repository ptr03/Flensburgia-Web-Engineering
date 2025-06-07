import { shallowMount } from '@vue/test-utils'
import DictionaryPage from '../../src/components/DictionaryPage.vue'
import DictionarySection from '../../src/components/DictionarySection.vue'

describe('DictionaryPage.vue', () => {
  it('renders DictionarySection', () => {
    const wrapper = shallowMount(DictionaryPage)
    // should contain one DictionarySection component
    expect(wrapper.findComponent(DictionarySection).exists()).toBe(true)
  })
})
