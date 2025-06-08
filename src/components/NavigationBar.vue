<template>
  <nav class="navbar">
    <!-- Desktop Navigation (centered, transparent background) -->
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

    <!-- Mobile Navigation (drawer only) -->
    <div class="mobile-nav">
      <button class="menu-btn" @click="menuOpen = true" aria-label="Menü öffnen">
        ☰
      </button>
      <transition name="slide">
        <div
          v-if="menuOpen"
          class="nav-drawer"
          @click.self="menuOpen = false"
        >
          <div class="drawer-content">
            <button class="close-btn" @click="menuOpen = false" aria-label="Schließen">
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

const menuOpen = ref(false)
const navLinks = [
  { name: 'Flensburgia',     path: '/' },
  { name: 'Sippungsfolge',    path: '/sippungsfolge' },
  { name: 'Events',          path: '/events' },
  { name: 'Die Flensburgen', path: '/die-flensburgen' },
  { name: 'Dictionary',      path: '/dictionary' },
  { name: 'Über Uns',        path: '/about' },
  { name: 'Kontakt',         path: '/contact' },
  { name: 'Newsletter',      path: '/newsletter' }
]
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  background: transparent;
  z-index: 1000;
}

/* Desktop Nav */
.desktop-nav {
  display: flex;
}
.nav-links {
  display: inline-flex;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.85);
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
  transition: background 0.2s, opacity 0.2s;
}
.nav-link:hover,
.nav-link:focus-visible {
  background: #fff;
  opacity: 0.9;
}
.nav-link.active {
  background: #fff;
}

/* Mobile Nav button */
.mobile-nav {
  display: none;
}
.menu-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #1d1d1f;
  cursor: pointer;
}

/* Drawer backdrop covers full viewport, solid grey */
.nav-drawer {
  position: fixed;
  inset: 0;
  background: #333;
  display: flex;
  justify-content: flex-start;
  z-index: 2000;
}

/* Drawer panel covers 100% */
.drawer-content {
  background: transparent;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  color: #fff;
}

/* Close button */
.close-btn {
  align-self: flex-end;
  font-size: 2rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-bottom: 1.5rem;
}

/* Links in drawer */
.drawer-link {
  padding: 1rem 0;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  font-size: 1.25rem;
}
.drawer-link:last-of-type {
  border-bottom: none;
}

/* Slide-in animation for drawer */
.slide-enter-from { transform: translateX(-100%); }
.slide-enter-active { transition: transform 0.3s ease; }
.slide-leave-to { transform: translateX(-100%); }
.slide-leave-active { transition: transform 0.3s ease; }

/* Breakpoint */
@media (max-width: 768px) {
  /* Hide desktop links, show mobile menu button */
  .desktop-nav {
    display: none !important;
  }
  .mobile-nav {
    display: flex !important;
  }

  /* Make navbar opaque and left-aligned so the ☰ is visible */
  .navbar {
    justify-content: flex-start;
    background: rgba(82, 51, 31, 0.39) !important;
    padding: 0.75rem 1rem;
    z-index: 2000;
    right: 83%;
  }

  /* Style the menu button in white */
  .menu-btn {
    font-size: 1.75rem;
    color: #fff !important;
  }
}
</style>
