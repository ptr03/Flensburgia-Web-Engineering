import { createRouter, createWebHistory } from 'vue-router'

// (1) Import every page component that you list in `routes`
import HomePage           from './components/HomePage.vue'
import AboutPage          from './components/AboutPage.vue'
import SippungsfolgePage  from './components/SippungsfolgePage.vue'
import ContactPage        from './components/ContactPage.vue'
import FlensburgenPage    from './components/FlensburgenPage.vue'
import DictionaryPage     from './components/DictionaryPage.vue'  

const routes = [
  { path: '/',             name: 'Home',          component: HomePage },
  { path: '/about',        name: 'About',         component: AboutPage },
  { path: '/sippungsfolge',name: 'Sippungsfolge', component: SippungsfolgePage },
  { path: '/contact',      name: 'Contact',       component: ContactPage },
  { path: '/die-flensburgen', name: 'DieFlensburgen', component: FlensburgenPage },
  {
    path: '/dictionary',
    name: 'Dictionary',
    component: DictionaryPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Wenn der Nutzer mit Zurück-/Vorwärts-Button navigiert, übernimmt savedPosition
    if (savedPosition) {
      return savedPosition
    }
    // Ansonsten immer ganz nach oben scrollen:
    return { top: 0 }
  }
})

export default router
