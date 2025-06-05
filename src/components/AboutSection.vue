<!-- src/components/AboutSection.vue -->
<template>
  <section class="about-section">
    <div class="content-container">
      
      <div class="text-container">
        <p class="paragraph animate-on-scroll">
          Die Schlaraffia Flensburgia ist Teil der weltweiten Vereinigung Schlaraffia® – 
          einer Gemeinschaft zur Pflege von Freundschaft, Kunst und Humor. Unsere Burg dient 
          als kultureller Treffpunkt, an dem wir Tradition und Moderne verbinden.
        </p>
        
        <div class="stats-grid animate-on-scroll" :style="{ 'transition-delay': '0.2s' }">
          <div v-for="(stat, index) in stats" :key="index" class="stat-item">
            <component :is="stat.icon" size="28" class="stat-icon" />
            <h3 class="stat-title">{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </div>

        <p class="paragraph animate-on-scroll" :style="{ 'transition-delay': '0.4s' }">
          Unsere Burg dient als Ort des kulturellen Austauschs, wo wir regelmäßig Sippungen 
          veranstalten und gemeinsam Projekte zur Förderung regionaler Kunst sowie internationaler Vernetzung entwickeln.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CalendarDays, Trophy, Users } from 'lucide-vue-next'

const stats = ref([
  { title: 'Jährliche Veranstaltungen', value: '30+', icon: CalendarDays },
  { title: 'Gegründet', value: '1973', icon: Trophy },
  { title: 'Aktive Mitglieder', value: '25+', icon: Users }
])

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.about-section {
  padding: clamp(4rem, 10vw, 8rem) 1.5rem;
  background: #ffffff;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: clamp(2rem, 5vw, 3rem);
  text-align: center;
}

/* Title in primary blue */
.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #0ea5e9;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

/* Absätze */
.paragraph {
  font-size: clamp(1rem, 1.25vw, 1.125rem);
  line-height: 1.6;
  color: #464646;
  margin: 0 auto;
  max-width: 65ch;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

/* Statistiken als Grid */
.stats-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.stat-item {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(210, 210, 215, 0.3);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
}

.stat-icon {
  color: #0066cc;
  margin-bottom: 1rem;
}

.stat-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1d1d1f;
}

/* Sobald das Element sichtbar ist, wird es eingeblendet */
.animate-on-scroll.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    margin-bottom: 2rem;
  }
}
</style>
