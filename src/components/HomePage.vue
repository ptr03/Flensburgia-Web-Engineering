<template>
  <HeroSection />

  <!-- About Teaser -->
  <section class="section about-teaser bg-transition">
    <div class="container">
      <h2 class="section-title text-center animate-on-scroll">Über Flensburgia</h2>
      <p class="teaser-text animate-on-scroll">
        Die Schlaraffia Flensburgia ist Teil der weltweiten Vereinigung Schlaraffia® – einer Gemeinschaft zur Pflege von Freundschaft, Kunst und Humor.
      </p>
      <div class="stats-grid">
        <div
          v-for="(stat, index) in statsTeaser"
          :key="index"
          class="stat-item animate-on-scroll"
          :style="{ 'transition-delay': `${0.2 * index}s` }"
        >
          <component :is="stat.icon" size="32" class="stat-icon text-primary" />
          <h3 class="stat-title">{{ stat.title }}</h3>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
      </div>
      <div class="cta-wrapper text-center">
        <!-- match outline style for both CTAs -->
        <router-link to="/about" class="btn btn-outline-gradient mt-4 animate-on-scroll">Mehr über uns</router-link>
      </div>
    </div>
  </section>

  <!-- Events Teaser -->
  <section class="section events-teaser bg-transition">
    <div class="container">
      <h2 class="section-title text-center animate-on-scroll">Kommende Veranstaltungen</h2>
      <div class="events-grid">
        <article
          v-for="(event, idx) in upcomingEvents"
          :key="event.id"
          class="event-card animate-on-scroll"
          :style="{ 'transition-delay': `${(idx + 1) * 0.2}s` }"
        >
          <time class="event-date">{{ event.date }}</time>
          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-excerpt">{{ event.excerpt }}</p>
        </article>
      </div>
      <div class="cta-wrapper text-center">
        <router-link to="/events" class="btn btn-outline-gradient mt-4 animate-on-scroll">Alle Veranstaltungen</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HeroSection from './HeroSection.vue'
import { CalendarDays, Trophy, Users } from 'lucide-vue-next'

const statsTeaser = ref([
  { title: 'Jährliche Veranstaltungen', value: '30+', icon: CalendarDays },
  { title: 'Gegründet', value: '1973', icon: Trophy },
  { title: 'Aktive Mitglieder', value: '25+', icon: Users }
])

// pulled from flensburgia.info as examples
const allEvents = ref([
  { id: 1, date: '15. Oktober 2024', title: 'Kulturerbe-Symposium', excerpt: 'Führende Experten diskutieren den Erhalt regionaler Kulturgüter durch moderne Methoden.' },
  { id: 2, date: '2.–4. November 2024', title: 'Traditionelles Kunstfestival', excerpt: 'Dreitägige Feier lokaler Handwerkskunst, Musik und Kulinarik mit Workshops.' },
  { id: 3, date: '1. Dezember 2024', title: 'Winterlichter-Ausstellung', excerpt: 'Interaktive Lichtinstallationen mit traditionellen Motiven und moderner Technologie.' },
  { id: 4, date: '10. Januar 2025', title: 'Neujahrsritual', excerpt: 'Feierlicher Ritus zum Jahresbeginn in der historischen Burg Flensburgia.' }
])
const upcomingEvents = ref(allEvents.value.slice(0, 3))

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.section {
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  overflow: hidden;
}
.about-teaser {
  background: #ffffff;
}
.about-teaser .section-title {
  color: #2b2e32;
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 1rem;
}
.about-teaser .teaser-text {
  color: #2f3034;
  margin-bottom: 2rem;
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}
.stat-item {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(31, 41, 55, 0.1);
}
.stat-icon { color: #2563eb; margin-bottom: 0.75rem; }
.stat-title { font-size: 1rem; font-weight: 500; margin-bottom: 0.25rem; color: #111827; }
.stat-value { font-size: 1.75rem; font-weight: 700; color: #111827; }
.events-teaser {
  background: #ffffff;
}
.events-teaser .section-title {
  color: #111827;
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 1rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
.event-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 4px 16px rgba(31, 41, 55, 0.1);
  transition: transform 0.3s ease;
}
.event-card:hover { transform: translateY(-4px); }
.event-date { font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem; display: block; }
.event-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; color: #111827; }
.event-excerpt { font-size: 1rem; color: #4b5563; line-height: 1.5; }

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.btn-outline-gradient {
  border: 2px solid #0071e3;
  color: #0071e3;
  background: transparent;
}
.btn-outline-gradient:hover {
  background: #eff6ff;
  transform: translateY(-2px);
}

.animate-on-scroll { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
.animate-in { opacity: 1 !important; transform: translateY(0) !important; }

@media (max-width: 640px) {
  .stats-grid, .events-grid { grid-template-columns: 1fr; }
  .btn { width: 100%; text-align: center; }
}
.cta-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.cta-wrapper .btn {
  margin: 0 auto; /* extra insurance */
}

</style>
