<template>
  <section class="about-section">
    <!-- Hero-Bereich -->
    <div class="hero-plain about-hero">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">Über Flensburgia</h1>
        <h2 class="welcome-text animate-target">
          Eine Gemeinschaft für Freundschaft, Kunst und Humor
        </h2>
      </div>
    </div>

    <!-- Einführender Text -->
    <div class="intro-text-container animate-target" style="transition-delay: 0.2s">
      <p class="intro-text">
        Die Schlaraffia Flensburgia ist Teil der weltweiten Vereinigung Schlaraffia® – 
        einer Gemeinschaft zur Pflege von Freundschaft, Kunst und Humor.  
        Unsere Burg dient als kultureller Treffpunkt, an dem wir Tradition und Moderne verbinden.
      </p>
    </div>

    <!-- Statistik-Karten -->
    <div class="stats-container">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card animate-target"
        :style="{ 'transition-delay': `${(index + 1) * 0.2}s` }"
      >
        <component :is="stat.icon" class="stat-icon" />
        <h3 class="stat-title">{{ stat.title }}</h3>
        <p class="stat-value">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Abschließender Satz -->
    <div class="footer-text-container animate-target" style="transition-delay: 0.8s">
      <p class="footer-text">
        Unsere Burg dient als Ort des kulturellen Austauschs, wo wir regelmäßig Sippungen 
        veranstalten und gemeinsam Projekte zur Förderung regionaler Kunst 
        sowie internationaler Vernetzung entwickeln.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { CalendarDays, Trophy, Users } from 'lucide-vue-next'

const stats = ref([
  { title: 'Jährliche Veranstaltungen', value: '30+', icon: CalendarDays },
  { title: 'Gegründet', value: '1973', icon: Trophy },
  { title: 'Aktive Mitglieder', value: '25+', icon: Users }
])

onMounted(() => {
  // Sobald die Komponente gemountet ist, fügen wir allen "animate-target"-Elementen die Klasse "animate-in" hinzu
  nextTick(() => {
    document.querySelectorAll('.animate-target').forEach(el => {
      el.classList.add('animate-in')
    })
  })
})
</script>

<style scoped>
/* ===============================
   Hero-ähnlicher Abschnitt
   =============================== */
.about-hero {
  background: #ffffff;
  padding-top: 64px;
  padding-bottom: 2rem;
  text-align: center;
}
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
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
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}
.welcome-text {
  color: #334155;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 300;
  margin-top: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

/* ===============================
   Einführender Text zentriert
   =============================== */
.intro-text-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  text-align: center;
}
.intro-text {
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.6;
  color: #1d1d1f;
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

/* ===============================
   Statistik-Karten-Container
   =============================== */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}
.stat-card {
  background: #ffffff;
  border: 1px solid rgba(210, 210, 215, 0.3);
  border-radius: 16px;
  padding: 2rem 1rem;
  box-shadow: 0 4px 16px rgba(31, 41, 55, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(31, 41, 55, 0.15);
}
.stat-icon {
  width: 1.75rem;
  height: 1.75rem;
  color: #0ea5e9;
  margin-bottom: 0.75rem;
}
.stat-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}
.stat-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

/* ===============================
   Abschließender Satz zentriert
   =============================== */
.footer-text-container {
  max-width: 700px;
  margin: 0 auto 3rem;
  padding: 0 1.5rem;
  text-align: center;
}
.footer-text {
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

/* ===============================
   Fade-In Animation
   =============================== */
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
.animate-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* ===============================
   Responsive Anpassungen
   =============================== */
@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: clamp(2rem, 7vw, 3.5rem);
  }
  .welcome-text {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
  }
}
</style>
