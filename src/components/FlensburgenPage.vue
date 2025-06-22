<template>
  <div class="flensburgen-page">
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
import FlensburgenSection from '../components/FlensburgenSection.vue'
</script>

<style scoped>
.section-title{
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
  margin-top: 5%;
}
.flensburgen-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ffffff;
}

.flense-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  padding: 0 1.5rem;
  background: #ffffff;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  overflow: visible;
}

.flense-hero .content-wrapper {
  text-align: center;
}

.flense-hero .section-title {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.2s;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 2;
  margin: 0;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.flense-hero .section-subtitle {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.4s;
  margin-top: 0.5rem;
  color: #334155;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.site-footer {
  margin-top: auto;
  background: #f8fafc;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
}

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
@media (max-width: 768px) {
  .flense-hero .content-wrapper {
    margin-top: 3rem;
  }
}
</style>
