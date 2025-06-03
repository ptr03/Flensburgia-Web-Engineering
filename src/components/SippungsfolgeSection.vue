<!-- src/components/SippungsfolgeSection.vue -->
<template>
  <section class="sippungs-section">
    <div class="months-container">
      <div
        v-for="(group, gIdx) in grouped"
        :key="gIdx"
        class="month-group"
      >
        <h3 class="month-title animate-fade-in delay-200">
          {{ group.label }}
        </h3>

        <div class="sippungs-grid">
          <button
            v-for="(item, idx) in group.items"
            :key="idx"
            class="sippungs-card animate-fade-in"
            :style="{ animationDelay: `${idx * 100}ms` }"
            @click="open(item)"
          >
            <div class="card-header">
              <span class="card-id">{{ item.id ? `#${item.id}` : '' }}</span>
              <time class="card-date">{{ item.date }}</time>
            </div>
            <p class="card-title">{{ item.title }}</p>
          </button>
        </div>
      </div>
    </div>

    <SippungsModal v-if="selected" :item="selected" @close="close" />
  </section>
</template>

<script setup>
import items from '../data/sippungsfolge.json'
import { computed, ref } from 'vue'
import SippungsModal from './SippungsModal.vue'

const toDate = str => {
  const [d, m, y] = str.split('.').map(Number)
  return new Date(y, m - 1, d)
}

const sortedItems = computed(() =>
  [...items].sort((a, b) => toDate(b.date) - toDate(a.date))
)

const grouped = computed(() => {
  const map = new Map()
  sortedItems.value.forEach(item => {
    const [ , m, y ] = item.date.split('.')
    const key = `${m}.${y}`
    const label = new Date(y, m - 1).toLocaleString('de-DE', {
      month: 'long',
      year: 'numeric'
    })
    if (!map.has(key)) map.set(key, { label, items: [] })
    map.get(key).items.push(item)
  })
  return Array.from(map.values())
})

const selected = ref(null)
function open(item) {
  selected.value = item
}
function close() {
  selected.value = null
}
</script>

<style scoped>
.sippungs-section {
  padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  padding-top: clamp(2rem, 5vw, 3rem);
  background: #ffffff;
}

.month-group + .month-group {
  margin-top: clamp(3rem, 6vw, 4rem);
}

/* =============================== */
/* Month Title – Blau (schwarz f. Text) */
/* =============================== */
.month-title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #0ea5e9; /* helleres Blau */
  text-align: center;
  margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
  position: relative;
  padding-bottom: 0.5rem;
}

.month-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #0ea5e9; /* helleres Blau */
}

/* =============================== */
/* Sippungs-Grid & Cards           */
/* =============================== */
.sippungs-grid {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: clamp(1.5rem, 3vw, 2rem);
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  align-items: flex-start;
}

.sippungs-grid::-webkit-scrollbar {
  height: 8px;
}
.sippungs-grid::-webkit-scrollbar-track {
  background: transparent;
}
.sippungs-grid::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}

.sippungs-card {
  flex: 0 0 260px;
  scroll-snap-align: start;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.sippungs-card:focus-visible {
  outline: 3px solid #0ea5e9;
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

/* =============================== */
/* Card Header – Hellblau + Schwarz */
/* =============================== */
.card-header {
  position: relative;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
  width: 100%;
}

.card-id {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
  font-weight: 600;
}

.card-date {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
  font-size: 0.9rem;
  font-weight: 600;
}

.card-title {
  padding: 1rem;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  flex-grow: 1;
  font-weight: 500;
  color: #2d3748;
  text-align: center;
}

/* =============================== */
/* Fade-In Hilfs-Klassen           */
/* =============================== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>
