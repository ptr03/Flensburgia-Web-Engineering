<!-- src/components/SippungsfolgeSection.vue -->
<template>
  <section class="sippungs-section">
    <div class="months-container">
      <div
        v-for="(group, gIdx) in grouped"
        :key="gIdx"
        class="month-group"
      >
        <!-- Monatstitel mit scroll-triggered Animation -->
        <h3 class="month-title animate-target delay-200">
          {{ group.label }}
        </h3>

        <div class="sippungs-grid">
          <button
            v-for="(item, idx) in group.items"
            :key="idx"
            class="sippungs-card animate-target"
            @click="open(item)"
          >
            <div class="card-header">
              <span class="card-id">{{ item.id ? `#${item.id}` : '' }}</span>
              <time class="card-date">{{ item.date }}</time>
            </div>

            <p class="card-title">{{ item.title }}</p>

            <!-- Bilder oder Fallback-Logo -->
            <div
              v-if="imagesById[item.id] && imagesById[item.id].length"
              class="single-image-wrapper"
            >
              <img
                :src="imagesById[item.id][0]"
                :alt="item.title"
                class="real-image"
              />
            </div>
            <div v-else class="single-image-wrapper">
              <img
                src="../assets/pictures/Flensburgia_icon.png"
                alt="Flensburgia Logo"
                class="fallback-logo"
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    <SippungsModal
      v-if="selected"
      :item="selected"
      :images="imagesById[selected.id] || []"
      @close="close"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import rawItems from '../data/sippungsfolge.json'
import SippungsModal from './SippungsModal.vue'

// Datumshilfe
const toDate = str => {
  const [d, m, y] = str.split('.').map(Number)
  return new Date(y, m - 1, d)
}

// Sortiere absteigend (neueste zuerst)
const sortedItems = computed(() =>
  [...rawItems].sort((a, b) => toDate(b.date) - toDate(a.date))
)

// Gruppiere nach Monat.Jahr
const grouped = computed(() => {
  const map = new Map()
  sortedItems.value.forEach(item => {
    const [ , m, y ] = item.date.split('.')
    const key = `${m}.${y}`
    const label = new Date(Number(y), Number(m) - 1).toLocaleString('de-DE', {
      month: 'long',
      year: 'numeric'
    })
    if (!map.has(key)) map.set(key, { label, items: [] })
    map.get(key).items.push(item)
  })
  return Array.from(map.values())
})

// Modal‐State
const selected = ref(null)
function open(item) {
  selected.value = item
}
function close() {
  selected.value = null
}

// Importiere Bilder
const imageModules = import.meta.glob(
  '/src/assets/pictures/sippungen/*/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
)

const imagesById = {}
Object.entries(imageModules).forEach(([fullPath, imported]) => {
  const match = fullPath.match(/\/sippungen\/([^/]+)\//)
  if (match && match[1]) {
    const id = match[1]
    if (!imagesById[id]) imagesById[id] = []
    imagesById[id].push(imported)
  }
})

// IntersectionObserver für scroll-triggered Animation
onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.animate-target').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.sippungs-section {
  padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  padding-top: clamp(2rem, 5vw, 3rem);
  background: #ffffff;
  flex: 1;
}

.month-group + .month-group {
  margin-top: clamp(3rem, 6vw, 4rem);
}

.month-title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #0ea5e9;
  text-align: center;
  margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
  position: relative;
  padding-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
}

.month-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #0ea5e9;
}

.sippungs-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  padding-bottom: 1rem;
}

.sippungs-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  opacity: 0;
  transform: translateY(20px);
  animation: none;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* gleiche Kartengröße */
  aspect-ratio: 4 / 5;
  width: 260px;
  overflow: hidden;
}

.sippungs-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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

/* ".animate-in" löst die Animation aus */
.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.card-header {
  position: relative;
  height: 48px;
  background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.card-id {
  margin-right: auto;
  color: #000000;
  font-weight: 600;
  font-size: 0.9rem;
}

.card-date {
  color: #000000;
  font-size: 0.9rem;
  font-weight: 600;
}

.card-title {
  margin: 0.75rem 0.5rem 0.5rem 0.5rem;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 500;
  color: #2d3748;
  text-align: center;
  flex-shrink: 0;
  line-height: 1.2;
  max-height: 2.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.single-image-wrapper {
  flex-grow: 1;
  margin: 0.5rem;
  overflow: hidden;
  border-radius: 6px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.single-image-wrapper .real-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.single-image-wrapper .fallback-logo {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* Verzögerungsklasse für Titel */
.delay-200 {
  animation-delay: 0.2s;
}

@media (max-width: 600px) {
  .sippungs-card {
    width: 90%;
    aspect-ratio: auto;
    height: auto;
  }
  .card-header {
    height: 40px;
  }
  .card-title {
    font-size: 1rem;
    margin: 0.5rem;
    max-height: 2.4rem;
  }
  .single-image-wrapper {
    height: 140px;
  }
}
</style>
