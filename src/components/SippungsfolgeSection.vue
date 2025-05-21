<template>
  <section class="sippungs-section">
    <div class="months-container">
      <div v-for="(group, gIdx) in grouped" :key="gIdx" class="month-group">
        <h3 class="month-title">{{ group.label }}</h3>

        <div class="sippungs-grid">
          <button                 
            v-for="(item, idx) in group.items"
            :key="idx"
            class="sippungs-card"
            :style="{ animationDelay: `${idx * 100}ms` }"
            @click="open(item)"
          >
            <div class="card-header">
              <span  class="card-id">{{ item.id ? `#${item.id}` : '' }}</span>
              <time  class="card-date">{{ item.date }}</time>
            </div>
            <p class="card-title">{{ item.title }}</p>
          </button>
        </div>
      </div>
    </div>

    <SippungsModal
      v-if="selected"
      :item="selected"
      @close="close"
    />
  </section>
</template>

<script setup>
import items from '../data/sippungsfolge.json'
import { computed, ref } from 'vue'
import SippungsModal from './SippungsModal.vue'

const toDate = (str) => {
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
    const label = new Date(y, m - 1).toLocaleString(
      'de-DE',
      { month: 'long', year: 'numeric' }        
    )

    if (!map.has(key)) map.set(key, { label, items: [] })
    map.get(key).items.push(item)               
  })

  return Array.from(map.values())                
})
const selected = ref(null)          
function open(item) { selected.value = item }
function close()     { selected.value = null }
</script>

<style scoped>
.sippungs-section {
  padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  padding-top: clamp(2rem, 5vw, 3rem);
  background: linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%);
}

.month-group + .month-group {
  margin-top: clamp(3rem, 6vw, 4rem);
}

.month-title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #2d3748;
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
  background: var(--color-primary);
}

.sippungs-grid {
  display: flex;
  flex-wrap: nowrap;      
  overflow-x: scroll;         
  gap: clamp(1.5rem, 3vw, 2rem);
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  align-items: flex-start;
}

.sippungs-grid::-webkit-scrollbar {
  height: 8px;
}
.sippungs-grid::-webkit-scrollbar-track {
  background: #e2e8f0;         
  border-radius: 4px;
}
.sippungs-grid::-webkit-scrollbar-thumb {
  background: var(--color-primary);  
  border-radius: 4px;
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
  background: none;
  border-radius: var(--radius-md);
  border: 0px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor:pointer;
  display:flex;
  flex-direction: column;
  background: #ffffff;
}
.sippungs-card:focus-visible { outline:3px solid var(--color-primary); }
.sippungs-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: var(--shadow-md);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-header {
  position: relative;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  width: 100%;
}

.card-id {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #ebf8ff;
  font-weight: 600;
}

.card-date {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #c6f6d5;
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
  background: #ffffff;
}
</style>
