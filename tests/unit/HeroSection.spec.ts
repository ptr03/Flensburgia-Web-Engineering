// tests/unit/HeroSection.spec.ts
import { shallowMount } from '@vue/test-utils'
import HeroSection from '@/components/HeroSection.vue'

describe('HeroSection.vue (simplified)', () => {
  const wrapper = shallowMount(HeroSection, {
    global: {
      stubs: {
        // Preserve attrs (like class) and render slot
        'router-link': { template: '<a v-bind="$attrs"><slot/></a>' },
        // stub icons, but they don't affect the spans
        Info: true,
        List: true,
        PhoneCall: true,
      },
    },
  })

  it('renders the two headings', () => {
    expect(wrapper.find('h1.hero-title').text()).toBe('Schlaraffia Flensburgia')
    expect(wrapper.find('h2.welcome-text').text()).toBe('Ein herzliches Willekum')
  })

  it('renders three grid buttons', () => {
    const buttons = wrapper.findAll('.grid-button')
    expect(buttons).toHaveLength(3)
    const labels = buttons.map(btn => btn.find('span').text())
    expect(labels).toEqual(['Über Uns', 'Sippungsfolge', 'Kontakt'])
  })
})
