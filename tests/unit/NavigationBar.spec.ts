// tests/unit/NavigationBar.spec.ts
import { mount, RouterLinkStub } from '@vue/test-utils'
import NavigationBar from '@/components/NavigationBar.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

// Dummy-Komponente für die Routes
const Dummy = defineComponent({ template: '<div />' })

const routes: RouteRecordRaw[] = [
  { path: '/',        name: 'Flensburgia',    component: Dummy },
  { path: '/sippungsfolge', name: 'Sippungsfolge', component: Dummy },
  { path: '/events',       name: 'Events',         component: Dummy },
  { path: '/die-flensburgen', name: 'Die Flensburgen', component: Dummy },
  { path: '/dictionary',   name: 'Dictionary',    component: Dummy },
  { path: '/about',        name: 'Über Uns',      component: Dummy },
  { path: '/contact',      name: 'Kontakt',       component: Dummy },
  { path: '/newsletter',   name: 'Newsletter',    component: Dummy },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('NavigationBar.vue', () => {
  beforeAll(async () => {
    router.push('/')
    await router.isReady()
  })

  function mountNav() {
    return mount(NavigationBar, {
      global: {
        plugins: [router],
        stubs: {
          // two ways to be safe:
          RouterLink: RouterLinkStub,
          'router-link': RouterLinkStub,
        },
      },
    })
  }

  it('renders all nav link texts', () => {
    const wrapper = mountNav()
    const texts = wrapper
      .findAll('.nav-link')
      .map(node => node.text())
    expect(texts).toEqual(routes.map(r => r.name))
  })

  it('opens and closes mobile menu toggle', async () => {
    const wrapper = mountNav()
    // initial: hidden
    expect(wrapper.find('.mobile-menu').exists()).toBe(false)

    // open
    await wrapper.find('.menu-toggle').trigger('click')
    expect(wrapper.find('.mobile-menu').exists()).toBe(true)

    // close
    await wrapper.find('.menu-toggle').trigger('click')
    expect(wrapper.find('.mobile-menu').exists()).toBe(false)
  })
})
