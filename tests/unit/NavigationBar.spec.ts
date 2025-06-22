// tests/unit/NavigationBar.spec.ts
import { mount, RouterLinkStub } from '@vue/test-utils'
import NavigationBar from '../../src/components/NavigationBar.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

// Dummy component for all routes
const Dummy = defineComponent({ template: '<div />' })

const routes: RouteRecordRaw[] = [
  { path: '/',               name: 'Flensburgia',     component: Dummy },
  { path: '/sippungsfolge',  name: 'Sippungsfolge',   component: Dummy },
  { path: '/events',         name: 'Events',          component: Dummy },
  { path: '/die-flensburgen',name: 'Die Flensburgen', component: Dummy },
  { path: '/dictionary',     name: 'Dictionary',      component: Dummy },
  { path: '/about',          name: 'Über Uns',        component: Dummy },
  { path: '/contact',        name: 'Kontakt',         component: Dummy },
  { path: '/newsletter',     name: 'Newsletter',      component: Dummy },
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
          RouterLink: RouterLinkStub,
          'router-link': RouterLinkStub,
        },
      },
    })
  }

  it('renders all desktop nav-link texts in order', () => {
    const wrapper = mountNav()
    const texts = wrapper.findAll('.nav-link').map(n => n.text())
    expect(texts).toEqual(routes.map(r => r.name))
  })

  it('each desktop link has the correct `to` prop', () => {
    const wrapper = mountNav()
    wrapper.findAllComponents(RouterLinkStub).forEach((linkStub, i) => {
      expect(linkStub.props('to')).toBe(routes[i].path)
    })
  })

   it('mobile menu is hidden by default, then toggles open/closed on button click', async () => {
    const wrapper = mountNav()
    
    // Drawer should not exist initially
    expect(wrapper.find('.nav-drawer').exists()).toBe(false)

    // Click to open
    await wrapper.find('.menu-btn').trigger('click')
    expect(wrapper.find('.nav-drawer').exists()).toBe(true)

    // Click again to close
    await wrapper.find('.menu-btn').trigger('click')
    expect(wrapper.find('.nav-drawer').exists()).toBe(false)
  })

  it('clicking a drawer link closes the mobile menu', async () => {
    const wrapper = mountNav()
    
    // Open drawer
    await wrapper.find('.menu-btn').trigger('click')
    expect(wrapper.find('.nav-drawer').exists()).toBe(true)

    // Click on the first drawer link
    const firstDrawerLink = wrapper.findAll('.drawer-link')[0]
    await firstDrawerLink.trigger('click')

    // Menu should now be closed
    expect(wrapper.find('.nav-drawer').exists()).toBe(false)
  })

  it('passes active-class="active" to each nav-link stub', () => {
    const wrapper = mountNav()
    wrapper.findAllComponents(RouterLinkStub).forEach(linkStub => {
      // router-link stubs expose attrs for kebab-cased props
      expect(linkStub.attributes('active-class')).toBe('active')
    })
})
})
