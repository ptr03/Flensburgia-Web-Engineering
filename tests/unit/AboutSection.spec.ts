import { shallowMount } from '@vue/test-utils'
import AboutSection from '../../src/components/AboutSection.vue'
import { CalendarDays, Trophy, Users } from 'lucide-vue-next'

describe('AboutSection.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>

  beforeEach(() => {
    wrapper = shallowMount(AboutSection, {
      global: {
        stubs: {
          // stub out the icons
          CalendarDays: true,
          Trophy: true,
          Users: true,
        },
      },
    })
  })

  it('renders two hero headings with correct text', () => {
    const h1 = wrapper.find('h1.hero-title')
    const h2 = wrapper.find('h2.welcome-text')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe('Über Flensburgia')
    expect(h2.exists()).toBe(true)
    expect(h2.text()).toContain('Eine Gemeinschaft für Freundschaft')
  })

  it('renders exactly three stat cards with correct titles and values', () => {
    const cards = wrapper.findAll('.stat-card')
    expect(cards).toHaveLength(3)

    const expected = [
      { title: 'Jährliche Veranstaltungen', value: '30+' },
      { title: 'Gegründet', value: '1973' },
      { title: 'Aktive Mitglieder', value: '25+' },
    ]

    cards.forEach((card, i) => {
      expect(card.find('h3.stat-title').text()).toBe(expected[i].title)
      expect(card.find('p.stat-value').text()).toBe(expected[i].value)
      // icon stub should be present
      expect(card.find('calendar-days-stub,trophy-stub,users-stub')).toBeTruthy()
    })
  })

  it('renders two external buttons with correct hrefs and labels', () => {
    const links = wrapper.findAll('a.external-button')
    expect(links).toHaveLength(2)
    expect(links[0].attributes('href')).toBe('https://www.schlaraffia-im-norden.de/')
    expect(links[0].text()).toBe('Schlaraffia im Norden')
    expect(links[1].attributes('href')).toBe('https://www.schlaraffia.org/')
    expect(links[1].text()).toBe('Schlaraffia® weltweit')
  })
})
