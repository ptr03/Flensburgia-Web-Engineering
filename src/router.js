/**
 * App-Router
 */

import { createRouter, createWebHistory } from 'vue-router'

const HomePage          = () => import('./components/HomePage.vue')
const AboutPage         = () => import('./components/AboutPage.vue')
const SippungsfolgePage = () => import('./components/SippungsfolgePage.vue')
const FlensburgenPage   = () => import('./components/FlensburgenPage.vue')
const ContactPage       = () => import('./components/ContactPage.vue')
const DictionaryPage    = () => import('./components/DictionaryPage.vue')
const ImpressumPage     = () => import('./components/Impressum.vue')
const TermsPage         = () => import('./components/Terms.vue')
const PrivacyPage       = () => import('./components/Privacy.vue')
const NewsletterPage    = () => import('./components/NewsletterPage.vue')
const EventPage         = () => import('./components/EventPage.vue')

export const routes = [
  { path: '/',               name: 'Home',          component: HomePage },
  { path: '/about',          name: 'About',         component: AboutPage },
  { path: '/sippungsfolge',  name: 'Sippungsfolge', component: SippungsfolgePage },
  { path: '/die-flensburgen',name: 'DieFlensburgen',component: FlensburgenPage },
  { path: '/contact',        name: 'Contact',       component: ContactPage },
  { path: '/dictionary',     name: 'Dictionary',    component: DictionaryPage },
  { path: '/impressum',      name: 'Impressum',     component: ImpressumPage },
  { path: '/terms',          name: 'Terms',         component: TermsPage },
  { path: '/privacy',        name: 'Privacy',       component: PrivacyPage },
  { path: '/newsletter',     name: 'Newsletter',    component: NewsletterPage },
  { path: '/events',         name: 'Events',        component: EventPage },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Browser-History navigation → vorige Scroll-Position wiederherstellen
    if (savedPosition) return savedPosition
    // Bei normaler Navigation stets nach oben
    return { top: 0 }
  },
})

export default router
