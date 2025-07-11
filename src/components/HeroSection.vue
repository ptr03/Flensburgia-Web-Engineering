<!-- src/components/HeroSection.vue -->
<template>
  <section
    class="hero-section"
    :style="{ backgroundImage: `url(${heroBg})` }"
  >
    <!-- Animated Title -->
    <div class="content-wrapper">
      <h1 class="hero-title">{{ title }}</h1>
      <h2 class="welcome-text">{{ subtitle }}</h2>
    </div>

    <!-- Button Grid overlapping next section -->
    <div class="button-grid">
      <router-link to="/about" class="grid-button">
        <Info class="icon" />
        <span>Über Uns</span>
      </router-link>

      <router-link to="/sippungsfolge" class="grid-button">
        <List class="icon" />
        <span>Sippungsfolge</span>
      </router-link>

      <router-link to="/contact" class="grid-button">
        <PhoneCall class="icon" />
        <span>Kontakt</span>
      </router-link>
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import heroBg from '../assets/pictures/3.jpeg'
import { Info, List, PhoneCall } from 'lucide-vue-next'

export default defineComponent({
  name: 'HeroSection',
  components: {
    RouterLink,
    Info,
    List,
    PhoneCall
  },
  props: {
    title: {
      type: String,
      default: 'Schlaraffia Flensburgia'
    },
    subtitle: {
      type: String,
      default: 'Ein herzliches Willekum'
    }
  },
  setup() {
    onMounted(() => {
      nextTick(() => {
        const titleEl = document.querySelector('.hero-title')
        const subtitleEl = document.querySelector('.welcome-text')
        const buttons = document.querySelectorAll('.grid-button')
        if (titleEl) titleEl.classList.add('animate-in')
        if (subtitleEl) subtitleEl.classList.add('animate-in')
        buttons.forEach((btn, i) => {
          btn.classList.add('hidden-btn')
          setTimeout(() => btn.classList.add('animate-btn'), 800 + i * 200)
        })
      })
    })
    return {
      heroBg
    }
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  background: center top / cover no-repeat;
  padding-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;

  opacity: 0;
  transform: translateY(30px);

  animation: fadeInBg 0.6s ease-out 0s forwards;
}

@keyframes fadeInBg {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1;
  opacity: 0;              
  animation: fadeInOverlay 0.6s ease-out 0.1s forwards;
}

@keyframes fadeInOverlay {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.content-wrapper {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
}

.hero-title,
.welcome-text {
  opacity: 0;
  transform: translateY(30px);
}

.animate-in {
  animation: fadeInUp 0.8s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  animation-delay: 0.2s;
}

.welcome-text {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 300;
  animation-delay: 0.5s;
}

.button-grid {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  z-index: 10;
  width: min(90%, 800px);
}

.grid-button {
  opacity: 1;
  position: relative;
  transform: translateY(0);
}

.hidden-btn {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.animate-btn {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.grid-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  text-decoration: none;
  color: #1d1d1f;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grid-button .icon {
  width: 1.5rem;
  height: 1.5rem;
  stroke-width: 1.5;
  color: #d13900;
}

.grid-button span {
  font-size: 1rem;
  font-weight: 600;
}

.grid-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .hero-section {
    align-items: flex-start;
    padding-top: 20vh;
  }
  .content-wrapper {
    transform: none;
  }
  .button-grid {
    grid-template-columns: repeat(3, 1fr);
    bottom: 10rem;
    width: 100%;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .grid-button {
    padding: 10%;
    font-size: 0.875rem;
  }
  .stats-grid {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .stat-item {
    flex: 1;
    padding: 0.75rem;
    text-align: center;
  }

  .stat-title {
    font-size: 0.875rem; 
    margin-bottom: 0.25rem;
  }

  .stat-value {
    font-size: 1.25rem;  
  }

  .stat-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-bottom: 0.5rem;
  }
}

</style>