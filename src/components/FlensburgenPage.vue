<template>
  <div class="section flensburgen-page">
    <!-- Hero Section -->
    <section class="hero-plain flense-hero">
      <div class="content-wrapper">
        <h1 class="section-title">Die Flensburgen</h1>
        <p class="section-subtitle">
          Entdecke unsere drei traditionsreichen Orden und ihre Geschichten.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <FlensburgenSection />
  </div>
</template>

<script setup>
import FlensburgenSection from './FlensburgenSection.vue'
</script>

<style scoped>
/* Page Background */
.flensburgen-page {
  background: #ffffff;
}

/* Hero Section */
.flense-hero {
  padding: clamp(3rem, 8vw, 5rem) 1.5rem;
  background: #ffffff;
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Hero Title & Subtitle */
.flense-hero .section-title {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.2s;
  color: #000;
  font-size: 3rem;
  font-weight: 700;
}

.flense-hero .section-subtitle {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.4s;
  margin-top: 0.5rem;
  color: #000;
  font-size: 1.5rem;
}

/* Fade-In Keyframes */
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
</style>
