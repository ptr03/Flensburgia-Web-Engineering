<template>
  <section class="flensburgen-section">
    <div class="category-grid">
      <!-- Category buttons to open respective modals -->
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-button"
        @click="openModal(cat.id)"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Modal Overlay -->
    <transition name="fade">
      <div v-if="activeId" class="modal-overlay" @click.self="closeModal">
        <div
          class="modal-content"
          :class="{ 'compact': activeId==='sassen' && filteredKnights.length===1 }"
        >
          <!-- Zoomed Image Overlay -->
          <transition name="fade">
            <div
              v-if="enlargedImage"
              class="image-zoom"
              @click.self="enlargedImage = null"
            >
              <img
                :src="getImage(enlargedImage.filename)"
                :alt="enlargedImage.name"
              />
            </div>
          </transition>

          <!-- Sassen Modal -->
          <div v-if="activeId === 'sassen'" class="modal-sassen">
            <h2>Sassen</h2>
            <div class="search-wrapper">
              <input
                v-model="search"
                type="text"
                placeholder="Suche..."
                class="search-bar"
              />
            </div>
            <transition-group
              name="fade-list"
              tag="div"
              class="sassen-grid"
              :class="{ single: filteredKnights.length === 1 }"
            >
              <div
                v-for="kn in filteredKnights"
                :key="kn.id"
                class="sassen-card"
              >
                <img
                  :src="getImage(kn.filename)"
                  :alt="kn.name"
                  class="clickable"
                  @click="enlargeImage(kn)"
                />
                <div class="sassen-name">{{ kn.name }}</div>
              </div>
            </transition-group>
          </div>

          <!-- Röde Grütt Modal -->
          <div v-else-if="activeId === 'rode-gruett'" class="modal-text poem">
            <h2>Röde Grütt</h2>
            <div class="text-content" v-html="formattedRodeGruett"></div>
          </div>

          <!-- Erz- & Ehrenschlaraffen Modal -->
          <div
            v-else-if="activeId === 'ehrenschlaraffen'"
            class="modal-ehrenschlaraffen"
          >
            <h2>Erz- & Ehrenschlaraffen</h2>
            <div class="ehrenschlaraffen-grid">
              <img
                v-for="fn in [
                  'Erzschlaraffen-1920w.webp',
                  'Ehrenschlaraffen-1920w.webp'
                ]"
                :key="fn"
                :src="getImage(fn)"
                class="clickable"
                @click="enlargeImage({ filename: fn, name: fn.replace('.webp','') })"
              />
            </div>
          </div>

          <!-- Close Button -->
          <button class="btn-close" @click="closeModal">×</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import knights from '../data/flensburgen.json'
import rodeGruettText from '../data/rodeGruetteText.js'

// Compute HTML with line breaks and paragraphs for the poem text
const formattedRodeGruett = computed(() => {
  const blocks = rodeGruettText.trim().split(/\n{2,}/g)
  return blocks
    .map((blk, i) => {
      const html = blk
        .split('\n')
        .map(l => l.trim())
        .join('<br/>')
      return i === 0
        ? `<p class="center intro">${html}</p>`
        : `<p>${html}</p>`
    })
    .join('')
})

// Category definitions for buttons
const categories = [
  { id: 'sassen', name: 'Sassen' },
  { id: 'rode-gruett', name: 'Röde Grütt' },
  { id: 'ehrenschlaraffen', name: 'Erz- & Ehrenschlaraffen' }
]

// Reactive state for which modal is open
const activeId = ref(null)
const openModal = id => { activeId.value = id }
const closeModal = () => {
  activeId.value = null
  enlargedImage.value = null
}

// State for image zoom overlay
const enlargedImage = ref(null)
const enlargeImage = img => { enlargedImage.value = img }

// Search input for Sassen knights
const search = ref('')
const sassenKnights = computed(() =>
  knights.filter(
    k => !['ehrenschlaraffen-1920w','erzschlaraffen-1920w'].includes(k.id)
  )
)
const filteredKnights = computed(() =>
  sassenKnights.value.filter(kn =>
    kn.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

// Prevent body scroll when modal is open
watch(activeId, val => {
  document.body.classList.toggle('modal-open', !!val)
})

// Vite import helper for images
const imageModules = import.meta.glob(
  '../assets/pictures/flensburgen/*',
  { eager: true }
)
function getImage(filename) {
  const path = `../assets/pictures/flensburgen/${filename}`
  return imageModules[path]?.default || ''
}
</script>

<style scoped>
/* -------------------- */
/* Base & Buttons       */
/* -------------------- */
.flensburgen-section { background: #fff; }

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-button {
  padding: 2rem 1.5rem;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp .6s ease-out forwards;
}
.category-button:nth-child(1) { animation-delay: .8s }
.category-button:nth-child(2) { animation-delay: 1s }
.category-button:nth-child(3) { animation-delay: 1.2s }
.category-button:hover {
  background: #e0e0e0;
  transform: scale(1.03);
}

/* Prevent background scroll */
body.modal-open { overflow: hidden }

/* -------------------------- */
/* Modal Overlay & Container  */
/* -------------------------- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 75vh;
  overflow-y: auto;
  position: relative;
  margin-top: 10vh;
  animation: zoomIn .4s ease;
  color: black;
}
.modal-content.compact {
  max-width: fit-content;
  width: auto;
  padding: 1rem 1.5rem;
}

/* Close button */
.btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

/* ---------------- */
/* Fade & Zoom Keyframes */
/* ---------------- */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px) }
  to   { opacity: 1; transform: translateY(0) }
}
@keyframes zoomIn {
  from { opacity: 0; transform: scale(.9) }
  to   { opacity: 1; transform: scale(1) }
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(.95) }
  to   { opacity: 1; transform: scale(1) }
}

/* ------------------------------- */
/* Modal Text (Röde Grütt Poem)   */
/* ------------------------------- */
.modal-text.poem .text-content {
  display: block;
  text-align: center;
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 65vh;
  padding: 1rem;
}

/* ---------------- */
/* Sassen Modal     */
/* ---------------- */
.modal-sassen h2 { margin-bottom: .25rem }

.search-wrapper {
  margin-bottom: .5rem;
  display: flex;
  justify-content: center;
}

.search-bar {
  width: 100%;
  max-width: 400px;
  padding: .75rem 1rem;
  font-size: 1.125rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: border .3s, box-shadow .3s;
}
.search-bar:focus {
  outline: none;
  border-color: #999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.sassen-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
  gap: 1rem;
}
.sassen-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  animation: fadeIn .3s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sassen-card img {
  width: 100%;
  object-fit: contain;
  max-height: 300px;
  cursor: zoom-in;
  transition: transform .3s;
}
.sassen-card:hover img { transform: scale(1.05) }
.sassen-name {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0,0,0,0.4);
  color: #fff;
  padding: .5rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
}

/* Single-result adjustments */
.sassen-grid.single { justify-content: center }
.sassen-card.single {
  background: none;
  box-shadow: none;
  padding: 0;
}
.sassen-card.single img { max-height: 50vh }

/* ------------------------------- */
/* Erz- & Ehrenschlaraffen Modal   */
/* ------------------------------- */
.ehrenschlaraffen-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  margin-top: 1rem;
}
.ehrenschlaraffen-grid img {
  width: 100%;
  max-width: 300px;
  cursor: zoom-in;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Transition-group fade */
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all .3s ease;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* -------------------- */
/* Image Zoom Overlay   */
/* -------------------- */
.image-zoom {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
}
.image-zoom img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}
</style>
