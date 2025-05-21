<template>
  <section 
    class="event-section"
    ref="sectionRef"
  >
    <div class="container">
      <h2 class="section-title">Kommende Veranstaltungen</h2>
      
      <div class="events-grid">
        <article 
          v-for="(event, index) in events"
          :key="event.id"
          class="event-card"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="card-content">
            <div class="date-badge">
              <Calendar class="calendar-icon" :size="20" />
              <time class="event-date">{{ event.date }}</time>
            </div>
            
            <h3 class="event-title">{{ event.title }}</h3>
            
            <div class="event-meta">
              <div class="meta-item">
                <MapPin class="meta-icon" :size="16" />
                <span>{{ event.location }}</span>
              </div>
            </div>

            <p class="event-excerpt">{{ event.excerpt }}</p>

            <router-link 
              :to="event.link"
              class="event-cta"
            >
              Details anzeigen
              <ArrowRight class="cta-arrow" :size="16" />
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Calendar, MapPin, ArrowRight } from 'lucide-vue-next'

const sectionRef = ref(null)

const events = ref([
  {
    id: 1,
    date: '15. Oktober 2024',
    title: 'Kulturerbe-Symposium',
    location: 'Flensburger Rathaus',
    excerpt: 'Führende Experten diskutieren den Erhalt regionaler Kulturgüter durch moderne Methoden.',
    link: '/events/kulturerbe-symposium'
  },
  {
    id: 2,
    date: '2.-4. November 2024',
    title: 'Traditionelles Kunstfestival',
    location: 'Flensburger Altstadt',
    excerpt: 'Dreitägige Feier lokaler Handwerkskunst, Musik und kulinarischer Traditionen mit Workshops.',
    link: '/events/kunstfestival'
  },
  {
    id: 3,
    date: '1. Dezember 2024',
    title: 'Winterlichter-Ausstellung',
    location: 'Flensburger Kunstmuseum',
    excerpt: 'Interaktive Lichtinstallationen mit traditionellen Motiven und moderner Technologie.',
    link: '/events/winterlichter'
  }
])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<style scoped>
.event-section {
  background: #fbfbfd;        /* light gradient if you prefer */
  padding: clamp(4rem,10vw,8rem) 0;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -0.015em;
  line-height: 1.1;
}

.events-grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
}

.event-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(210, 210, 215, 0.3);
  padding: 2rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.event-card.visible {
  transform: translateY(0);
  opacity: 1;
}

.card-content {
  display: grid;
  gap: 1.5rem;
  height: 100%;
}

.date-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #86868b;
  margin-bottom: 0.5rem;
}

.calendar-icon {
  color: #0066cc;
}

.event-title {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.3;
  color: #1d1d1f;
  letter-spacing: -0.01em;
}

.event-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #86868b;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  color: #0066cc;
}

.event-excerpt {
  font-size: 1rem;
  line-height: 1.6;
  color: #464646;
  margin: 1rem 0;
}

.event-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0066cc;
  font-weight: 500;
  text-decoration: none;
  margin-top: auto;
  transition: gap 0.3s ease;
}

.cta-arrow {
  transition: transform 0.3s ease;
}

.event-card:hover .cta-arrow {
  transform: translateX(3px);
}

.event-card:hover .event-cta {
  gap: 0.75rem;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .event-section {
    background: linear-gradient(to bottom, #000000 0%, #1a1a1a 100%);
  }
  
  .event-card {
    background: rgba(28, 28, 30, 0.9);
    border-color: rgba(255, 255, 255, 0.08);
  }
  
  .event-title {
    color: #ffffff;
  }
  
  .event-excerpt {
    color: rgba(255, 255, 255, 0.75);
  }
  
  .calendar-icon,
  .meta-icon {
    color: #2997ff;
  }
  
  .event-cta {
    color: #2997ff;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .event-card {
    padding: 1.75rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .event-card {
    transition: opacity 0.6s ease !important;
  }
  
  .event-card.visible {
    transform: none;
  }
  
  .cta-arrow,
  .event-cta {
    transition: none !important;
  }
}
</style>