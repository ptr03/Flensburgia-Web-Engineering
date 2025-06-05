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

            <!-- Wenn es Bilder gibt, normale Bild-Klasse nutzen -->
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

            <!-- Wenn keine Bilder, dann Logo mit eigener Klasse -->
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
import { ref, computed } from 'vue'
import rawItems from '../data/sippungsfolge.json'
import SippungsModal from './SippungsModal.vue'

// 1) Datumshilfe: "DD.MM.YYYY" → Date-Objekt
const toDate = str => {
  const [d, m, y] = str.split('.').map(Number)
  return new Date(y, m - 1, d)
}

// 2) Sortiere absteigend (neueste zuerst)
const sortedItems = computed(() =>
  [...rawItems].sort((a, b) => toDate(b.date) - toDate(a.date))
)

// 3) Gruppiere nach Monat.Jahr
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

// 4) Modal‐State
const selected = ref(null)
function open(item) {
  selected.value = item
}
function close() {
  selected.value = null
}

// 5) VARIANTE B: Alle Bilder aus /src/assets/pictures/sippungen/<id>/* einlesen
const imageModules = import.meta.glob(
  '/src/assets/pictures/sippungen/*/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
)

const imagesById = {}
Object.entries(imageModules).forEach(([fullPath, imported]) => {
  // Beispiel fullPath: "/src/assets/pictures/sippungen/3185/sippung_3185_img1.webp"
  const match = fullPath.match(/\/sippungen\/([^/]+)\//)
  if (match && match[1]) {
    const id = match[1]
    if (!imagesById[id]) imagesById[id] = []
    imagesById[id].push(imported)
  }
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
  width: 260px;
  height: 380px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  flex-grow: 1;
}

.single-image-wrapper {
  margin: 0.5rem;
  height: 160px;            
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


.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}
.delay-200 {
  animation-delay: 0.2s;
}

@media (max-width: 600px) {
  .sippungs-card {
    width: 90%;
    height: auto;
  }
  .card-header {
    height: 40px;
  }
  .card-title {
    font-size: 1rem;
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
  .single-image-wrapper {
    height: 140px;
  }
}
</style>
