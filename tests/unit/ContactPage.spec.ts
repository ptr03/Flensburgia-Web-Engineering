// Stub IntersectionObserver so it doesn't error
;(globalThis as any).IntersectionObserver = class {
  constructor(cb: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { vi } from 'vitest'
import ContactPage from '@/components/ContactPage.vue'

describe('ContactPage.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(ContactPage)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the hero title and subtitle', () => {
    expect(wrapper.find('h1.section-title').text()).toBe('Kontakt')
    expect(wrapper.find('p.section-subtitle').text()).toContain(
      'Wir stehen Ihnen gerne zur Verfügung'
    )
  })

  it('renders two contact list entries with correct links', () => {
    const items = wrapper.findAll('ul.contact-list li')
    expect(items).toHaveLength(2)

    // Check first entry’s phone and email hrefs
    const first = items[0]
    expect(first.find('a[href^="tel:"]').attributes('href')).toBe('tel:+4946120791')
    expect(first.find('a[href^="mailto:"]').attributes('href')).toBe('mailto:couplet@t-online.de')
  })

  it('submits the form, shows success message, and clears fields', async () => {
    const nameInput = wrapper.find('input#name')
    const emailInput = wrapper.find('input#email')
    const messageInput = wrapper.find('textarea#message')
    const submitBtn = wrapper.find('button[type="submit"]')

    // fill in
    await nameInput.setValue('Max Mustermann')
    await emailInput.setValue('max@beispiel.de')
    await messageInput.setValue('Hallo!')

    // now wrapper.vm.form is available
    expect((wrapper.vm as any).form.name).toBe('Max Mustermann')
    expect((wrapper.vm as any).form.email).toBe('max@beispiel.de')
    expect((wrapper.vm as any).form.message).toBe('Hallo!')

    // submit
    await submitBtn.trigger('submit')
    await nextTick()

    // success message should appear
    expect(wrapper.find('p.form-success').exists()).toBe(true)
    expect(wrapper.find('p.form-success').text()).toBe('Ihre Nachricht wurde gesendet!')

    // fields should be cleared in the DOM
    expect((nameInput.element as HTMLInputElement).value).toBe('')
    expect((emailInput.element as HTMLInputElement).value).toBe('')
    expect((messageInput.element as HTMLTextAreaElement).value).toBe('')

    // advance 5 seconds, success message should disappear
    vi.advanceTimersByTime(5000)
    await nextTick()
    expect(wrapper.find('p.form-success').exists()).toBe(false)
  })
})
