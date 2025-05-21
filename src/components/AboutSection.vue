<template>
  <section 
    class="about-section"
    ref="sectionElement"
  >
    <div class="content-container">
      <h2 class="section-title">Über Flensburgia</h2>
      
      <div class="text-container">
        <p class="paragraph fade-in">
          Die Schlaraffia Flensburgia ist Teil der weltweiten Vereinigung Schlaraffia® – 
          einer Gemeinschaft zur Pflege von Freundschaft, Kunst und Humor.
        </p>
        
        <div class="stats-grid fade-in">
          <div 
            v-for="(stat, index) in stats" 
            :key="index" 
            class="stat-item"
          >
            <component :is="stat.icon" :size="28" class="stat-icon" />
            <h3 class="stat-title">{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </div>

        <p class="paragraph fade-in">
          Unsere Burg dient als Ort des kulturellen Austauschs, wo wir regelmäßig 
          Sippungen veranstalten und gemeinsam Projekte zur Förderung regionaler Kunst 
          sowie internationaler Vernetzung entwickeln.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CalendarDays, Trophy, Users } from 'lucide-vue-next';

const stats = ref([
  { 
    title: 'Jährliche Veranstaltungen', 
    value: '30+',
    icon: CalendarDays
  },
  { 
    title: 'Gegründet', 
    value: '1973',
    icon: Trophy
  },
  {
    title: 'Aktive Mitglieder',
    value: '25+',
    icon: Users
  }
]);

const sectionElement = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
</script>

<style scoped>
.about-section {
  padding: clamp(4rem, 10vw, 8rem) 1.5rem;
  background: #fbfbfd;
}

.content-container {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.015em;
}

.text-container {
  display: grid;
  gap: clamp(2rem, 5vw, 3rem);
}

.paragraph {
  font-size: clamp(1rem, 1.25vw, 1.125rem);
  line-height: 1.6;
  color: #464646;
  text-align: center;
  margin: 0 auto;
  max-width: 65ch;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-item {
    padding: 1.5rem;
  }
}
</style>