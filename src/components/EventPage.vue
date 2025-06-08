<template>
  <div class="event-page">
    <!-- Hero‐Abschnitt -->
    <section class="hero-plain event-hero">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">
          <Calendar class="title-icon" />
          Schlaraffen-Events
        </h1>
        <h2 class="welcome-text animate-target">
          Erlebe gesellige Runden und kulinarische Höhepunkte
        </h2>
      </div>
    </section>

    <!-- EventSection einbinden -->
    <EventSection />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import EventSection from '../components/EventSection.vue'
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
.event-page {
  background: #ffffff;
  min-height: 100vh;
}

/* Hero-Bereich (analog zu anderen Seiten) */
.hero-plain {
  padding-top: 64px;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.content-wrapper {
  max-width: 800px;
  text-align: center;
  padding: 0 1.5rem;
}

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
  color: transparent;
}

.title-icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 1rem;
  color: #0ea5e9;
}

.welcome-text {
  color: #334155;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 300;
  margin-top: 0.25rem;
}

/* Fade-In Animation */
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

.animate-target {
  opacity: 0;
  transform: translateY(20px);
}

.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}
.horizontal-scroll-wrapper {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.horizontal-scroll-container {
  display: flex;
  gap: 1rem;
}

.scroll-item {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 140px;
}
@media (max-width: 768px) {
  .horizontal-scroll-wrapper {
    justify-content: flex-start !important;
  }

  .scroll-item {
    width: 140px !important;
  }

  .event-button {
    font-size: 0.875rem !important;
    padding: 0.5rem !important;
  }
}

</style>
