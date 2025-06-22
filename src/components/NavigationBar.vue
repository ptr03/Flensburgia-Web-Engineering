<template>
  <nav class="navbar">
    <!-- Clock always here, not inside desktop-nav -->
    <SchlaraffiaTime class="nav-clock" />

    <!-- Desktop Navigation, hidden on mobile -->
    <div class="desktop-nav">
      <div class="nav-links">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          active-class="active"
          exact
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>

    <!-- Mobile Menu Button & Drawer -->
    <div class="mobile-nav">
      <button class="menu-btn" @click="menuOpen = !menuOpen">☰</button>
      <transition name="slide">
        <div
          v-if="menuOpen"
          class="nav-drawer"
          @click.self="menuOpen = false"
        >
          <div class="drawer-content">
            <button class="close-btn" @click="menuOpen = false">
              &times;
            </button>
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="drawer-link"
              @click="menuOpen = false"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import SchlaraffiaTime from '../components/SchlaraffiaTime.vue'

const menuOpen = ref(false)
const navLinks = [
  { name: 'Flensburgia',        path: '/' },
  { name: 'Sippungsfolge',      path: '/sippungsfolge' },
  { name: 'Events',             path: '/events' },
  { name: 'Die Flensburgen',    path: '/die-flensburgen' },
  { name: 'Dictionary',         path: '/dictionary' },
  { name: 'Über Uns',           path: '/about' },
  { name: 'Kontakt',            path: '/contact' },
  { name: 'Newsletter',         path: '/newsletter' }
]
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: transparent;
  z-index: 1000;
}

/* Clock container — always visible */
.nav-clock {
  position: absolute;
  top: 50%;               
  right: 1rem;           
  transform: translateY(-50%);
  margin-right: 27rem;
}

/* Desktop nav links */
.desktop-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}
.nav-links {
  display: inline-flex;
  gap: 1.5rem;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
}
.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  color: #1d1d1f;
  text-decoration: none;
}
.nav-link.active,
.nav-link:hover {
  background: #fff;
}

/* Mobile nav button */
.mobile-nav {
  display: none;
}
.menu-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-nav {
    display: block;
  }
  .nav-clock {
    position: fixed !important;
    top: 0.8rem;
    right: 0.8rem;
    margin: 0;
    z-index: 2000;
    transform: scale(0.9);
  }
}

/* Mobile drawer */
.nav-drawer {
  position: fixed; inset: 0;
  background: #333;
  display: flex; justify-content: flex-start;
  z-index: 1500;
}
.drawer-content {
  padding: 2rem;
  width: 80%;
  background: #222; color: #fff;
}
.close-btn {
  font-size: 2rem;
  background: none; border: none;
  color: #fff; cursor: pointer;
  margin-bottom: 1rem;
}
.drawer-link {
  display: block;
  padding: 1rem 0;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.drawer-link:last-of-type {
  border-bottom: none;
}

/* Drawer animation */
.slide-enter-from { transform: translateX(-100%); }
.slide-enter-active { transition: transform 0.3s ease; }
.slide-leave-to { transform: translateX(-100%); }
.slide-leave-active { transition: transform 0.3s ease; }
</style>
