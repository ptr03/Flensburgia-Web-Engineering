<!-- src/components/SippungsfolgePage.vue -->
<template>
  <div class="sippungs-page">
    <section class="hero-plain">
      <div class="content-wrapper">
        <!-- Hero-Titel animieren -->
        <transition name="fade-down" appear>
          <h1 class="hero-title">Sippungsfolge</h1>
        </transition>
        <transition name="fade-down" appear>
          <h2 class="welcome-text">Unsere Treffen von April bis Oktober</h2>
        </transition>
      </div>
    </section>

    <!-- Verzögert anzeigen, damit die Hero-Überschrift fertig animiert ist -->
    <transition name="fade-in-section">
      <SippungsfolgeSection v-if="showSection" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SippungsfolgeSection from './SippungsfolgeSection.vue'

const showSection = ref(false)

// Nach 0,8 s (Dauer der Hero-Animation) blenden wir den Sippungs-Bereich ein
onMounted(() => {
  setTimeout(() => {
    showSection.value = true
  }, 800)
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

/* ================================ */
/* Hero-Titel – Gradient Styling    */
/* ================================ */
.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.welcome-text {
  color: #334155;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 300;
  margin-top: 0.25rem;
}

/* ======================================== */
/* Fade-Down Transition für Hero-Titel      */
/* (Initial Appearance via `appear`)        */
/* ======================================== */
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-down-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ======================================== */
/* Fade-In für den gesamten Sippungs-Bereich */
/* ======================================== */
.fade-in-section-enter-from {
  opacity: 0;
}

.fade-in-section-enter-to {
  opacity: 1;
}

.fade-in-section-enter-active {
  transition: opacity 0.4s ease-out;
}
</style>
