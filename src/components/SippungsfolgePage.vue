<!-- src/pages/SippungsfolgePage.vue -->
<template>
  <div class="sippungs-page">
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">
          <Calendar class="title-icon" />
          Sippungsfolge
        </h1>
        <h2 class="welcome-text animate-target">Unsere Treffen von April bis Oktober</h2>
      </div>
    </section>
    <SippungsfolgeSection />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import SippungsfolgeSection from '../components/SippungsfolgeSection.vue'
import { Calendar } from 'lucide-vue-next'

onMounted(() => {
  nextTick(() => {
    document
      .querySelectorAll('.animate-target')
      .forEach(el => el.classList.add('animate-in'))
  })
})
</script>

<style scoped>
.sippungs-page {
  background: #ffffff;
  min-height: 100vh;
}

.hero-plain {
  padding-top: 64px;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.content-wrapper {
  text-align: center;
  max-width: 800px;
  padding: 0 1.5rem;
}

/* Keyframe für Fade-In nach oben */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hero-Titel: Grundstil, ohne initiales Verschieben */
.hero-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Icon-Größe und Abstand */
.title-icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 1rem;
  color: #0ea5e9;
}

/* Willkommens-Text */
.welcome-text {
  color: #334155;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 300;
  margin-top: 0.25rem;
}

.animate-target {
  opacity: 0;
  transform: translateY(20px);
}

.animate-in {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
