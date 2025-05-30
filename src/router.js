import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import SippungsfolgePage from './components/SippungsfolgePage.vue'
import ContactPage from './components/ContactPage.vue'
import FlensburgenPage from './components/FlensburgenPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  {
    path: '/sippungsfolge',
    name: 'Sippungsfolge',
    component: SippungsfolgePage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/die-flensburgen',
    name: 'DieFlensburgen',
    component: FlensburgenPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
