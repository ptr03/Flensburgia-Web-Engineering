<template>
  <transition name="slide-fade" appear>
    <div class="newsletter-page">
      <!-- Hero (optional) -->
      <section class="hero-plain">
        <div class="content-wrapper">
          <h1 class="hero-title">Unser Newsletter</h1>
          <h2 class="welcome-text">Verpasse keine Neuigkeiten mehr!</h2>
        </div>
      </section>

      <!-- NewsletterSection einfügen -->
      <NewsletterSection />
    </div>
  </transition>
</template>

<script setup>
import NewsletterSection from '../components/NewsletterSection.vue'
</script>

<style scoped>
.newsletter-page {
  min-height: 100vh;
  background: #ffffff;
}

/* Hero (optional) */
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

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.welcome-text {
  color: #334155;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin-top: 0.5rem;
  font-weight: 300;
}
</style>

<!-- global / unscoped styles for the slide-and-fade animation -->
<style>
.slide-fade-enter-active {
  transition: opacity 1s ease, transform 1s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
