<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-links">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          exact-active-class=""
        >
          {{ link.name }}
        </router-link>
      </div>

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

    <div v-if="menuOpen" class="mobile-menu">
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="mobile-nav-link"
        @click="toggleMenu"
      >
        {{ link.name }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

const navLinks = [
  { name: 'Flensburgia',                     path: '/' },
  { name: 'Sippungsfolge',                   path: '/sippungsfolge' },
  { name: 'Die Flensburgen',                 path: '/die-flensburgen' },
  { name: 'Kilianischer Windjammerorden',    path: '/windjammerorden' },
  { name: 'Dictionary',                        path: '/dictionary' },
  { name: 'Über Uns',                        path: '/about' },
  { name: 'Kontakt',                        path: '/contact' }
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

.nav-links {
  display: inline-flex;
  gap: 1.5rem;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
}

.nav-link {
  color: #1d1d1f;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease, background 0.2s ease;
  padding: 0.25rem 0.5rem;
}

.nav-link:hover {
  background: rgba(255,255,255,1);
  opacity: 0.8;
}

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

@media (max-width: 768px) {
  .nav-links { display: none; }
  .menu-toggle { display: block; }

  .mobile-menu {
    position: fixed;
    top: 60px; left: 0; right: 0;
    background: rgba(255,255,255,0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .mobile-nav-link {
    color: #1d1d1f;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }
}

.router-link-active .nav-link,
.router-link-exact-active .nav-link,
.router-link-active .mobile-nav-link {
  color: inherit !important;
  text-decoration: none !important;
}

.nav-link,
.mobile-nav-link{
  position: relative;    
  display:inline-block;
  padding: .5rem 1rem;     
  border-radius: 9999px;  
  font-weight: 600;
  color:#1d1d1f;
  text-decoration:none;
  transition: background .2s ease, opacity .2s ease;
}

.nav-link:hover,
.nav-link:focus-visible{
  background:#fff;          
  opacity:.9;
}

.router-link-active,
.router-link-exact-active{
  background:#fff;         
}

.nav-links{
  display:inline-flex;
  gap:1.5rem;
  background:rgba(255,255,255,.85);
  backdrop-filter:blur(10px);
  padding:.5rem 1rem;
  border-radius:9999px;
}

</style>
