<!-- src/components/AboutSection.vue -->
<template>
  <section class="about-section">
    <!-- Hero-Bereich (jetzt mit mehr Abstand unten) -->
    <div class="hero-plain about-hero">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">Über Flensburgia</h1>
        <h2 class="welcome-text animate-target">
          Eine Gemeinschaft für Freundschaft, Kunst und Humor
        </h2>
      </div>
    </div>

    <!-- Infotext-Box direkt unter dem Subtitle -->
    <div class="welcome-box animate-target" style="transition-delay: 0.2s">
      <p>
        Willkommen! – Ein herzliches Willekum!<br /><br />
        Hier sind Sie richtig, wenn Sie in eine Welt eintauchen wollen, in der Werte noch einen Wert haben.<br /><br />
        Schlaraffia ist ein Spiel, das 1859 in Prag gegründet wurde. Es vereint auf einmalige Art und Weise Freundschaft mit Humor und Kunst. In jedem Fall ist Schlaraffia eine Persiflage auf das Leben. Ein deutschsprachiger Männerbund, weder geheim, noch politisch oder berufsfördernd. Dafür weltoffen und fröhlich. Also zeitgemäßer denn je. Lernen Sie uns kennen!
      </p>
    </div>
    <div class="buttons-container animate-target" style="transition-delay: 1s">
      <a
        class="external-button"
        href="https://www.schlaraffia-im-norden.de/"
        target="_blank"
        rel="noopener"
      >
        Schlaraffia im Norden
      </a>
      <a
        class="external-button"
        href="https://www.schlaraffia.org/"
        target="_blank"
        rel="noopener"
      >
        Schlaraffia® weltweit
      </a>
    </div>
    <!-- Statistik-Karten -->
    <div class="stats-container">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card animate-target"
        :style="{ 'transition-delay': `${(index + 1) * 0.2 + 0.2}s` }"
      >
        <component :is="stat.icon" class="stat-icon" />
        <h3 class="stat-title">{{ stat.title }}</h3>
        <p class="stat-value">{{ stat.value }}</p>
      </div>
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
  nextTick(() => {
    document.querySelectorAll('.animate-target').forEach(el => {
      el.classList.add('animate-in')
    })
  })
})
</script>

<style scoped>
/* ===============================
   Hero-ähnlicher Abschnitt (mehr Abstand unten)
   =============================== */
.about-hero {
  background: #ffffff;
  padding-top: 48px;       /* etwas weniger oben */
  padding-bottom: 6rem;    /* noch mehr Abstand unten, damit Titel weiter runterrutscht */
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
  margin-top: 5%;
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
   Infotext-Box
   =============================== */
.welcome-box {
  max-width: 700px;
  margin: -3rem auto 2rem; 
  padding: 1.5rem 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}
.welcome-box p {
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.6;
  color: #1d1d1f;
  margin: 0;
  white-space: pre-wrap;
}

/* ===============================
   Statistik-Karten-Container
   =============================== */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 2.5rem auto; /* etwas mehr Abstand nach Infotext-Box */
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
   Buttons direkt unter Stats
   =============================== */
.buttons-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}
.external-button {
  display: inline-block;
  background: #0ea5e9;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s, transform 0.2s;
}
.external-button:hover {
  background: #0369a1;
  transform: translateY(-2px);
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
  .welcome-box {
    margin: -2rem auto 1.5rem; /* negative margin auf Mobil etwas reduziert */
    padding: 1rem 1rem;
  }
  .buttons-container {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
