<!-- src/pages/AboutPage.vue -->
<template>
  <div class="about-page-wrapper">
    <!-- Hero Section wie bei SippungsfolgePage -->
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">
          Über Flensburgia
        </h1>
        <h2 class="welcome-text animate-target">
          Eine Gemeinschaft für Freundschaft, Kunst und Humor
        </h2>
      </div>
    </section>

    <!-- AboutSection (Intro + Stats) -->
    <AboutSection />

    <!-- Timeline Section (nur horizontale Boxen) -->
    <section class="container timeline-section">
      <h2 class="section-title text-center animate-target">Unsere Geschichte</h2>
      <div class="timeline-horizontal">
        <div
          v-for="(item, idx) in timeline"
          :key="idx"
          class="timeline-item animate-target"
          :style="{ 'transition-delay': `${idx * 0.2}s` }"
        >
          <div class="marker"></div>
          <div class="content">
            <h3>{{ item.year }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Link Section -->
    <section class="container link-section">
      <h2 class="section-title text-center animate-target">Unser Orden</h2>
      <div class="link-grid">
        <router-link to="/die-flensburgen" class="link-card animate-target" :style="{ 'transition-delay': '0.2s' }">
          <img :src="placeholderImg" alt="Die Flensburgen" />
          <span>Die Flensburgen</span>
        </router-link>
        <router-link to="/sippungsfolge" class="link-card animate-target" :style="{ 'transition-delay': '0.4s' }">
          <img :src="placeholderImg" alt="Sassen" />
          <span>Sassen</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import AboutSection from '../components/AboutSection.vue'
import placeholderImg from '../assets/pictures/Flensburgia_icon.png'

// Timeline-Daten (Beispiele; bitte mit endgültigen Inhalten ersetzen)
const timeline = ref([
  { year: '1859', description: 'Gründung der Schlaraffia in Prag.' },
  { year: '1973', description: 'Gründung der Schlaraffia Flensburgia.' },
  { year: '1985', description: 'Erste große Ritterfestspiele in Flensburg.' },
  { year: '2001', description: 'Einweihung des neuen Burgsaals.' },
  { year: '2020', description: 'Digitalisierung der Sippungen und Online-Treffen.' }
])

onMounted(() => {
  nextTick(() => {
    document.querySelectorAll('.animate-target').forEach(el => el.classList.add('animate-in'))
  })
})
</script>

<style scoped>
.about-page-wrapper {
  background: #ffffff;
  min-height: 100vh;
}

/* Hero-Abschnitt analog zu SippungsfolgePage */
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
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-text {
  color: #334155;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 300;
  margin-top: 0.25rem;
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

.animate-target {
  opacity: 0;
  transform: translateY(20px);
}

.animate-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Container-Grundlage */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Horizontaler Timeline-Container */
.timeline-section {
  margin-top: 3rem;
}
.section-title {
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: 2rem;
}
.timeline-horizontal {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-behavior: smooth;
}
.timeline-item {
  flex: 0 0 240px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}
.marker {
  width: 12px;
  height: 12px;
  background: #0ea5e9;
  border-radius: 50%;
  margin: 0 auto 1rem;
}
.content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #111827;
}
.content p {
  margin: 0;
  color: #4b5563;
  line-height: 1.4;
}

/* Link-Section */
.link-section {
  margin-top: 3rem;
}
.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: #1d1d1f;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.link-card img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 1rem;
}
.link-card span {
  font-size: 1.125rem;
  font-weight: 500;
  color: #0ea5e9;
}
.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-item {
    flex: 0 0 200px;
  }
  .marker {
    width: 10px;
    height: 10px;
  }
}
</style>
