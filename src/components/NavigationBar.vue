<template>
  <nav class="navbar">
    <div class="container">
      <!-- Desktop‐Links -->
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

      <!-- Hamburger‐Icon für Mobile -->
      <button
        class="menu-toggle"
        :class="{ active: menuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Mobile‐Menü -->
    <div v-if="menuOpen" class="mobile-menu">
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="mobile-nav-link"
        active-class="active"
        exact
        @click="toggleMenu"
      >
        {{ link.name }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

const navLinks = [
  { name: 'Flensburgia',  path: '/' },
  { name: 'Sippungsfolge', path: '/sippungsfolge' },
  { name: 'Events',       path: '/events' },
  { name: 'Die Flensburgen', path: '/die-flensburgen' },
  { name: 'Dictionary',   path: '/dictionary' },
  { name: 'Über Uns',     path: '/about' },
  { name: 'Kontakt',      path: '/contact' },
  { name: 'Newsletter',   path: '/newsletter' }
]
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  padding: 0.75rem 2rem;
  z-index: 1000;
  display: flex;
  justify-content: center;
  background: transparent;
}

/* --------------------------------
   Desktop‐Links
   -------------------------------- */
.nav-links {
  display: inline-flex;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  color: #1d1d1f;
  text-decoration: none;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  background: #fff;
  opacity: 0.9;
}

/* Aktive Route */
.nav-link.active {
  background: #fff;
}

/* --------------------------------
   Hamburger‐Icon (nur Mobile)
   -------------------------------- */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  margin-left: auto;
  cursor: pointer;
}
.bar {
  width: 24px;
  height: 2px;
  background: #1d1d1f;
  margin: 4px 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* --------------------------------
   Mobile‐Menü
   -------------------------------- */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .menu-toggle {
    display: block;
  }

  .mobile-menu {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .mobile-nav-link {
    position: relative;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    color: #1d1d1f;
    text-decoration: none;
    font-size: 1.1rem;
    margin: 0.5rem 0;
    transition: background 0.2s ease, opacity 0.2s ease;
  }
  .mobile-nav-link:hover,
  .mobile-nav-link:focus-visible {
    background: #fff;
    opacity: 0.9;
  }
  .mobile-nav-link.active {
    background: #fff;
  }
}
</style>
