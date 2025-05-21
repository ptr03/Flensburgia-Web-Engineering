<template>
  <div class="sippungs-page">
    <!-- Hero-like header on white background -->
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 class="hero-title">Sippungsfolge</h1>
        <h2 class="welcome-text">Unsere Treffen von Oktober bis April</h2>
      </div>
    </section>
    <SippungsfolgeSection />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import SippungsfolgeSection from './SippungsfolgeSection.vue'

onMounted(() => {
  nextTick(() => {
    document.querySelectorAll('.hero-title, .welcome-text').forEach(el => {
      el.classList.add('animate-in')
    })
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
  min-height: 30vh;  /* Reduced height */
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

.hero-title,
.welcome-text {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4,0,0.2,1);
}

.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.hero-title {
  color: black;
  font-size: clamp(2.5rem,6vw,4rem);
  font-weight: 700;
}

.welcome-text {
  color: black;
  font-size: clamp(1.5rem,3vw,2.5rem);
  font-weight: 300;
  margin-top: 0.25rem;  /* Reduced spacing */
}
</style>