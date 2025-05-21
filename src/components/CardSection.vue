<template>
  <section class="card-section" ref="sectionRef">
    <div class="cards-container">
      <router-link 
        v-for="(card, index) in cards" 
        :key="card.route" 
        :to="card.route"
        class="card"
        :style="{ transitionDelay: `${index * 50}ms` }"
      >
        <div class="card-icon">
          <component :is="card.icon" :size="32" />
        </div>
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-description">{{ card.description }}</p>
        <div class="card-action">
          <span class="action-text">Discover</span>
          <ArrowRight class="action-arrow" :size="16" />
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BookOpen, Clock, Map, ArrowRight } from 'lucide-vue-next'

const cards = [
  {
    title: 'Dictionary',
    description: 'Explore our comprehensive cultural terminology database',
    route: '/dictionary',
    icon: BookOpen
  },
  {
    title: 'Timeline',
    description: 'Journey through our region\'s historical milestones',
    route: '/timeline',
    icon: Clock
  },
  {
    title: 'Tour',
    description: 'Discover guided experiences of cultural landmarks',
    route: '/tour',
    icon: Map
  }
]

const sectionRef = ref(null)

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
.card-section {
  padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(to bottom, #fbfbfd 0%, #ffffff 100%);
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  max-width: 1440px;
  margin: 0 auto;
}

.card {
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(210, 210, 215, 0.3);
  text-decoration: none;
  color: inherit;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s ease;
}

.card.visible {
  transform: translateY(0);
  opacity: 1;
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  border-color: rgba(210, 210, 215, 0.6);
}

.card-icon {
  margin-bottom: 1.5rem;
  color: #0066cc;
  transition: transform 0.3s ease;
}

.card:hover .card-icon {
  transform: scale(1.1);
}

.card-title {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1d1d1f;
  letter-spacing: -0.015em;
}

.card-description {
  font-size: clamp(0.9375rem, 1.25vw, 1.0625rem);
  line-height: 1.6;
  color: #464646;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.card-action {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: #0066cc;
  transition: gap 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-arrow {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .action-arrow {
  transform: translateX(4px);
}

.card:hover .card-action {
  gap: 1rem;
}

@media (prefers-color-scheme: dark) {
  .card-section {
    background: linear-gradient(to bottom, #000000 0%, #1a1a1a 100%);
  }
  
  .card {
    background: rgba(28, 28, 30, 0.8);
    border-color: rgba(255, 255, 255, 0.08);
  }
  
  .card-title {
    color: #ffffff;
  }
  
  .card-description {
    color: rgba(255, 255, 255, 0.75);
  }
  
  .card-icon {
    color: #2997ff;
  }
  
  .card-action {
    color: #2997ff;
  }
}

@media (max-width: 768px) {
  .cards-container {
    gap: 1.5rem;
  }
  
  .card {
    padding: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: opacity 0.6s ease !important;
  }
  
  .card:hover {
    transform: none !important;
  }
  
  .card-action,
  .card-icon,
  .action-arrow {
    transition: none !important;
  }
}
</style>