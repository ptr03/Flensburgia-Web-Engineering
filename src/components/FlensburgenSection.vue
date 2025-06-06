<template>
  <section class="flensburgen-section">
    <!-- Obere Kategorie-Buttons: Sassen, Röde Grütt, Erz- & Ehrenschlaraffen, Windjammer -->
    <div class="category-grid">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-button"
        @click="openModal(cat.id)"
      >
        <component :is="cat.icon" class="category-icon" />
        <span>{{ cat.name }}</span>
      </button>
    </div>

    <transition name="fade">
      <div v-if="activeId" class="modal-overlay" @click.self="closeModal">
        <div
          class="modal-content"
          :class="{
            compact:
              activeId === 'sassen' && filteredSassen.length === 1
          }"
        >
          <!-- Bild-Zoom Overlay -->
          <transition name="fade">
            <div
              v-if="enlargedImage"
              class="image-zoom"
              @click.self="enlargedImage = null"
            >
              <img
                :src="getImage(enlargedImage.fullPath)"
                :alt="enlargedImage.name"
              />
            </div>
          </transition>

          <!-- ====================== -->
          <!-- 1) Sassen Modal       -->
          <!-- ====================== -->
          <div v-if="activeId === 'sassen'" class="modal-sassen">
            <h2 class="modal-title">Sassen</h2>

            <!-- Suchfeld (Position wie gehabt) -->
            <div class="search-wrapper">
              <input
                v-model="search"
                type="text"
                placeholder="Suche..."
                class="search-bar"
              />
            </div>

            <!-- Gitterdarstellung der Sassen -->
            <transition-group
              name="fade-list"
              tag="div"
              class="sassen-grid"
              :class="{ single: filteredSassen.length === 1 }"
            >
              <div
                v-for="kn in filteredSassen"
                :key="kn.id"
                class="sassen-card"
              >
                <img
                  :src="getImage(kn.fullPath)"
                  :alt="kn.name"
                  class="clickable"
                  @click="enlargeImage(kn)"
                />
                <div class="sassen-name">{{ kn.name }}</div>
              </div>
            </transition-group>
          </div>

          <!-- ====================== -->
          <!-- 2) Röde Grütt Modal   -->
          <!-- ====================== -->
          <div v-else-if="activeId === 'rode-gruett'" class="modal-text poem">
            <h2 class="modal-title">Röde Grütt</h2>
            <div class="text-content" v-html="formattedRodeGruett"></div>
          </div>

          <!-- =============================================== -->
          <!-- 3) Erz- & Ehrenschlaraffen – Auswahlbuttons   -->
          <!-- =============================================== -->
          <div
            v-else-if="activeId === 'schlaraffen' && subSchlaraffen === null"
            class="modal-schlaraffen-selection"
          >
            <h2 class="modal-title">Erz- & Ehrenschlaraffen</h2>
            <div class="selection-buttons">
              <button
                class="sub-button"
                @click="subSchlaraffen = 'erz'"
              >
                Erzschlaraffen
              </button>
              <button
                class="sub-button"
                @click="subSchlaraffen = 'ehr'"
              >
                Ehrenschlaraffen
              </button>
            </div>
          </div>

          <!-- =========================================== -->
          <!-- 4a) Erzschlaraffen – zeigt Bilder aus Ordner „Erzschlaraffen“ -->
          <!-- =========================================== -->
          <div
            v-else-if="activeId === 'schlaraffen' && subSchlaraffen === 'erz'"
            class="modal-schlaraffen-grid"
          >
            <h2 class="modal-title">Erzschlaraffen</h2>
            <div class="ehrenschlaraffen-grid">
              <div
                v-for="item in erzList"
                :key="item.id"
                class="ehrenschlaraffen-card"
              >
                <img
                  :src="getImage(item.fullPath)"
                  :alt="item.name"
                  class="clickable"
                  @click="enlargeImage(item)"
                />
                <div class="ehrenschlaraffen-name">{{ item.name }}</div>
              </div>
            </div>

            <!-- Zurück-Button -->
            <button class="btn-back" @click="subSchlaraffen = null">
              ← Zur Auswahl
            </button>
          </div>

          <!-- =========================================== -->
          <!-- 4b) Ehrenschlaraffen – zeigt Bilder aus Ordner „Ehrenschlaraffen“ -->
          <!-- =========================================== -->
          <div
            v-else-if="activeId === 'schlaraffen' && subSchlaraffen === 'ehr'"
            class="modal-schlaraffen-grid"
          >
            <h2 class="modal-title">Ehrenschlaraffen</h2>
            <div class="ehrenschlaraffen-grid">
              <div
                v-for="item in ehrList"
                :key="item.id"
                class="ehrenschlaraffen-card"
              >
                <img
                  :src="getImage(item.fullPath)"
                  :alt="item.name"
                  class="clickable"
                  @click="enlargeImage(item)"
                />
                <div class="ehrenschlaraffen-name">{{ item.name }}</div>
              </div>
            </div>

            <!-- Zurück-Button -->
            <button class="btn-back" @click="subSchlaraffen = null">
              ← Zur Auswahl
            </button>
          </div>

          <!-- =========================================== -->
          <!-- 5) Kilianischer Windjammerorden Modal    -->
          <!-- =========================================== -->
          <div
            v-else-if="activeId === 'kilianischer-windjammerorden'"
            class="modal-text modal-windjammer"
          >
            <h2 class="modal-title">Kilianischer Windjammerorden</h2>
            <div class="text-content" v-html="formattedWindjammer"></div>
            <div class="download-links">
              <a
                href="https://view.officeapps.live.com/op/view.aspx?src=…"
                class="btn-download"
                target="_blank"
              >
                Eynritts-Liste herunterladen
              </a>
              <a
                href="https://cdn.website-editor.net/.../statuten.pdf"
                class="btn-download"
                target="_blank"
              >
                Historische Statuten herunterladen
              </a>
            </div>
          </div>

          <!-- Schließen-Button -->
          <button class="btn-close" @click="closeModal">×</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import MarkdownIt from 'markdown-it'

// Texte importieren
import rodeGruettText from '../data/rodeGruetteText.md?raw'
import windjammerText from '../data/windjammerText.md?raw'

// Icons von lucide-vue-next
import { Users, BookOpen, Award, Ship } from 'lucide-vue-next'

// Markdown-Renderer
const md = new MarkdownIt()
const formattedRodeGruett = computed(() => md.render(rodeGruettText))
const formattedWindjammer = computed(() => md.render(windjammerText))

// Kategorien definieren
const categories = [
  { id: 'sassen', name: 'Sassen', icon: Users },
  { id: 'rode-gruett', name: 'Röde Grütt', icon: BookOpen },
  { id: 'schlaraffen', name: 'Erz- & Ehrenschlaraffen', icon: Award },
  {
    id: 'kilianischer-windjammerorden',
    name: 'Kilianischer Windjammerorden',
    icon: Ship
  }
]

// Modal-State
const activeId = ref(null)
const openModal = (id) => {
  activeId.value = id
  if (id === 'schlaraffen') subSchlaraffen.value = null
}
const closeModal = () => {
  activeId.value = null
  enlargedImage.value = null
  subSchlaraffen.value = null
}

// Bild-Zoom
const enlargedImage = ref(null)
const enlargeImage = (obj) => {
  enlargedImage.value = obj
}

// Such‐Feld für Sassen
const search = ref('')

// Alle Bilder in allen Unterordnern laden
const allImages = import.meta.glob(
  '../assets/pictures/flensburgen/**/**/*.{png,webp,jpg,jpeg}',
  { eager: true, import: 'default' }
)

// Hilfsfunktion: Aus viteKey ein Objekt { id, name, fullPath } machen
function makeItemObject(viteKey) {
  // Beispiel viteKey:
  // "../assets/pictures/flensburgen/Sassen/Junker Friedrich.png"
  const parts = viteKey.split('/')
  const filenameWithExt = parts[parts.length - 1]          // "Junker Friedrich.png"
  const folderName = parts[parts.length - 2]                // "Sassen", "Erzschlaraffen" oder "Ehrenschlaraffen"
  const name = filenameWithExt.replace(/\.(png|webp|jpg|jpeg)$/i, '')
  const id = name
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/gi, '-')
    .replace(/^-+|-+$/g, '')
  const fullPath = `${folderName}/${filenameWithExt}`
  return { id, name, fullPath }
}

// 1) Sassen-Liste (dynamisch aus Ordner „Sassen“)
const sassenList = computed(() => {
  const arr = []
  Object.keys(allImages).forEach((key) => {
    if (key.includes('/Sassen/')) {
      arr.push(makeItemObject(key))
    }
  })
  return arr
})

// 2) Gefilterte Sassen nach Suchbegriff
const filteredSassen = computed(() =>
  sassenList.value.filter((kn) =>
    kn.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

// 3) Erzschlaraffen-Liste (wie gehabt)
const erzList = computed(() => {
  const arr = []
  Object.keys(allImages).forEach((key) => {
    if (key.includes('/Erzschlaraffen/')) {
      arr.push(makeItemObject(key))
    }
  })
  return arr
})

// 4) Ehrenschlaraffen-Liste (wie gehabt)
const ehrList = computed(() => {
  const arr = []
  Object.keys(allImages).forEach((key) => {
    if (key.includes('/Ehrenschlaraffen/')) {
      arr.push(makeItemObject(key))
    }
  })
  return arr
})

// State für Auswahl bei Schlaraffen
const subSchlaraffen = ref(null) // null | 'erz' | 'ehr'

// Body-Scroll sperren, wenn Modal offen
watch(activeId, (val) => {
  document.body.classList.toggle('modal-open', !!val)
})

// getImage: Lädt Bild via vite-glob
function getImage(path) {
  // path = "Sassen/Name.png" oder "Erzschlaraffen/Name.png"
  const fullKey = `../assets/pictures/flensburgen/${path}`
  return allImages[fullKey] || ''
}
</script>

<style scoped>
/* =========================== */
/* Base & Buttons              */
/* =========================== */
.flensburgen-section {
  flex: 1;
  background: #ffffff;
  padding: 2rem 1.5rem;
}

/* 2×2 Grid für vier Buttons */
.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}
@media (max-width: 640px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}

/* Style der Kategorie-Buttons */
.category-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 1rem;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}
.category-button:nth-child(1) {
  animation-delay: 0.6s;
}
.category-button:nth-child(2) {
  animation-delay: 0.7s;
}
.category-button:nth-child(3) {
  animation-delay: 0.8s;
}
.category-button:nth-child(4) {
  animation-delay: 0.9s;
}
.category-button:hover {
  background: #e0e0e0;
  transform: scale(1.02);
}
.category-icon {
  width: 1.75rem;
  height: 1.75rem;
  color: #0ea5e9;
}

/* =========================== */
/* Modal Overlay & Container   */
/* =========================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: zoomIn 0.4s ease-out;
}
.modal-content.compact {
  max-width: fit-content;
  width: auto;
  padding: 1rem 1.5rem;
}

/* Close Button */
.btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

/* =========================== */
/* Fade & Zoom Keyframes        */
/* =========================== */
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
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* =========================== */
/* Sassen Modal                */
/* =========================== */
.modal-sassen h2 {
  margin-bottom: 0.5rem;
  color: #0ea5e9;
  font-size: 1.75rem;
  font-weight: 700;
}

.search-wrapper {
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
}

.search-bar {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: border 0.3s, box-shadow 0.3s;
}
.search-bar:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.1);
}

.sassen-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}
.sassen-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sassen-card img {
  width: 100%;
  object-fit: contain;
  max-height: 300px;
  cursor: zoom-in;
  transition: transform 0.3s;
}
.sassen-card:hover img {
  transform: scale(1.05);
}
.sassen-name {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  padding: 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
}

/* Single-Result Anpassung */
.sassen-grid.single {
  justify-content: center;
}
.sassen-card.single {
  background: none;
  box-shadow: none;
  padding: 0;
}
.sassen-card.single img {
  max-height: 50vh;
}

/* =========================== */
/* Röde Grütt Modal            */
/* =========================== */
.modal-text.poem .text-content {
  text-align: center;
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 65vh;
  padding: 1rem;
}
.modal-text .text-content {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.5;
}
.modal-text.poem .text-content p:first-of-type::first-letter {
  float: left;
  font-size: 4rem;
  line-height: 1;
  margin-right: 0.5rem;
  font-family: serif;
}

/* =========================== */
/* Auswahl-Buttons im Schlaraffen-Modal */
/* =========================== */
.modal-schlaraffen-selection {
  text-align: center;
}
.modal-schlaraffen-selection h2 {
  margin-bottom: 1rem;
  color: #0ea5e9;
  font-size: 1.75rem;
  font-weight: 700;
}
.selection-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}
.sub-button {
  flex: 1;
  max-width: 200px;
  padding: 1rem;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.sub-button:hover {
  background: #e0e0e0;
  transform: scale(1.02);
}

/* =========================== */
/* Erz- & Ehrenschlaraffen-Grid */
/* =========================== */
.modal-schlaraffen-grid h2 {
  margin-bottom: 0.5rem;
  color: #0ea5e9;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
}

.ehrenschlaraffen-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  justify-items: center;
  margin-top: 1rem;
}

.ehrenschlaraffen-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.3s ease-out;
}
.ehrenschlaraffen-card img {
  width: 100%;
  object-fit: contain;
  max-height: 200px;
  cursor: zoom-in;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  transition: transform 0.3s;
}
.ehrenschlaraffen-card:hover img {
  transform: scale(1.05);
}
.ehrenschlaraffen-name {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
}

/* Zurück-Button */
.btn-back {
  margin-top: 1rem;
  padding: 0.75rem 1.25rem;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}
.btn-back:hover {
  background: #e0e0e0;
}

/* =========================== */
/* Kilianischer Windjammerorden Modal */
/* =========================== */
.modal-windjammer p:first-of-type::first-letter {
  float: left;
  font-size: 3rem;
  line-height: 1;
  margin-right: 0.5rem;
  font-family: serif;
}

.modal-windjammer {
  column-count: 1;
  column-gap: 0;
}
.modal-windjammer h2 {
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.modal-windjammer h3.wj-intro {
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.modal-windjammer ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.modal-windjammer li {
  margin-bottom: 0.5rem;
}

.modal-windjammer .text-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
  text-align: justify;
}

.download-links {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-download {
  padding: 0.75rem 1.25rem;
  background: #0056a6;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-download:hover {
  background: #003f7d;
}

/* =========================== */
/* Transition-Klassen           */
/* =========================== */
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* =========================== */
/* Image Zoom Overlay           */
/* =========================== */
.image-zoom {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
}
.image-zoom img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* Prevent background scroll */
body.modal-open {
  overflow: hidden;
}
</style>
