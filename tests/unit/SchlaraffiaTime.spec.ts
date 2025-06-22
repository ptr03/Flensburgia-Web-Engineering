import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, it, expect, vi, afterEach } from 'vitest'
import SchlaraffiaTime from '../../src/components/SchlaraffiaTime.vue'

// Freeze time at 2025-01-02T03:04:05
const MOCK_DATE = new Date('2025-01-02T03:04:05')

describe('SchlaraffiaTime.vue', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(MOCK_DATE)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('renders correct Schlaraffen-Datum and time', () => {
    const wrapper = mount(SchlaraffiaTime)
    const date = wrapper.find('.date').text()
    const time = wrapper.find('.time').text()

    // Year = 2025 − 1858 = 167
    expect(date).toBe('02.01.167')
    expect(time).toBe('03:04:05')
  })

  it('popup is hidden by default, then shows on icon click', async () => {
    const wrapper = mount(SchlaraffiaTime)

    // initially no popup
    expect(wrapper.find('.info-popup').exists()).toBe(false)

    // click the info icon
    await wrapper.find('.info-icon').trigger('click')
    await nextTick()

    // popup should now exist
    expect(wrapper.find('.info-popup').exists()).toBe(true)
  })
})
