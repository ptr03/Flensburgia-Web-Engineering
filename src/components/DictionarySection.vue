<!-- src/components/DictionarySection.vue -->
<template>
  <div class="dictionary-section">
    <!-- ========================= -->
    <!-- 1) LANDING VIEW          -->
    <!-- ========================= -->
    <div v-if="view === 'landing'" class="landing-view">
      <!-- 1.1) Großes Title -->
      <h1 class="landing-title animate-fade-in">
        Schlaraffisches Wörterbuch
      </h1>

      <!-- 1.2) Größere Beschreibung -->
      <p class="landing-desc animate-fade-in delay-200">
        Entdecke unsere umfassende Sammlung schlaraffischer Begriffe,<br />
        Traditionen und Hintergründe.
      </p>

      <!-- 1.3) Zwei große Buttons (fade-in ver­zögert) -->
      <div class="landing-buttons animate-fade-in delay-400">
        <button @click="goToCategories" class="landing-btn">
          Kategorien
        </button>
        <button @click="showRandomTerm" class="landing-btn">
          Zufälliger Begriff
        </button>
      </div>

      <!-- 1.4) Landing-Suche direkt unter den Buttons -->
      <div class="landing-search animate-fade-in delay-600">
        <input
          v-model="landingSearch"
          type="text"
          placeholder="Begriff direkt suchen…"
          class="landing-search-bar"
        />
      </div>

      <!-- Landing-Search-Ergebnisse -->
      <div
        v-if="landingSearch.trim().length > 0"
        class="landing-results animate-fade-in delay-800"
      >
        <div
          v-for="entry in landingResults"
          :key="entry.term"
          class="dictionary-card result-card"
          @click="openDetails(entry)"
        >
          <div class="card-header">
            <div class="term-container">
              <h3 class="term">{{ entry.term }}</h3>
            </div>
            <span class="expand-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 
                     10l-6 6-6-6 1.41-1.41z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <!-- 1.5) Zufälliger Begriff – Vorschau  -->
      <div v-if="randomEntry" class="random-preview animate-fade-in delay-600">
        <h2 class="preview-heading">Zufälliger Begriff</h2>
        <div class="preview-card">
          <div class="preview-icon">
            <img
              src="../assets/pictures/Flensburgia_icon.png"
              alt="Icon"
              class="preview-icon-img"
            />
          </div>
          <div class="preview-text">
            <h3 class="preview-term">{{ randomEntry.term }}</h3>
            <p class="preview-definition">{{ randomEntry.definition }}</p>
            <p v-if="randomEntry.beispiel" class="preview-extra">
              <strong>Beispiel:</strong> {{ randomEntry.beispiel }}
            </p>
            <p v-if="randomEntry.kategorie" class="preview-extra">
              <strong>Kategorie:</strong> {{ randomEntry.kategorie }}
            </p>
            <p v-if="randomEntry.herkunft" class="preview-extra">
              <strong>Herkunft:</strong> {{ randomEntry.herkunft }}
            </p>
          </div>
          <button @click="clearRandom" class="btn-close-preview">
            ×
          </button>
        </div>
      </div>

      <!-- 1.6) Featured Term Teaser (fade-in) -->
      <div class="featured-teaser animate-fade-in delay-400">
        <h2 class="featured-heading">Begriffs‐Vorschau</h2>
        <div class="featured-card">
          <div class="featured-icon">
            <img
              src="../assets/pictures/Flensburgia_icon.png"
              alt="Begriff Icon"
              class="featured-icon-img"
            />
          </div>
          <div class="featured-text">
            <p class="featured-term font-semibold">
              {{ featuredList[currentIndex].term }}
            </p>
            <p class="featured-definition text-sm text-gray-600 leading-relaxed">
              {{ featuredList[currentIndex].definition }}
            </p>
          </div>
        </div>
      </div>

      <!-- 1.7) Footer-Hinweis -->
      <p class="landing-footer animate-fade-in delay-600">
        Du kannst jederzeit über „Kategorien“ eine vollständige Übersicht öffnen.
      </p>
    </div>

    <!-- ========================= -->
    <!-- 2) CATEGORIES VIEW        -->
    <!-- ========================= -->
    <div
      v-else-if="view === 'categories'"
      class="categories-view animate-fade-in"
    >
      <!-- Top Bar mit Zurück-Button rechts -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex-1"></div>
        <h2 class="section-heading">Kategorien</h2>
        <button @click="goToLanding" class="back-button">
          Zurück
        </button>
      </div>

      <p class="section-desc mb-8 text-center text-gray-600">
        Wähle eine Kategorie, um alle darin enthaltenen Begriffe anzusehen.
      </p>

      <!-- Kategorien im 3×3 Grid -->
      <div class="categories-grid">
        <div
          v-for="cat in categories"
          :key="cat"
          class="category-card cursor-pointer hover:shadow-lg transition animate-fade-in delay-200"
          @click="selectCategory(cat)"
        >
          <span class="term text-xl">{{ cat }}</span>
        </div>
      </div>
    </div>

    <!-- ========================= -->
    <!-- 3) TERMS VIEW             -->
    <!-- ========================= -->
    <div v-else-if="view === 'terms'" class="terms-view animate-fade-in">
      <!-- Top Bar: Heading + Zurück nebeneinander -->
      <div class="terms-header mb-6">
        <h2 class="section-heading">{{ selectedCategory }}</h2>
        <button @click="goToCategories" class="back-button-terms">
          Zurück
        </button>
      </div>

      <!-- Suchleiste (immer lang genug, Placeholder „Suche“) -->
      <div class="search-container mb-12">
        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Suche…"
            class="search-bar-term"
          />
          <svg class="search-icon" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 
                 6.471 0 0 0 16 9.5 6.5 6.5 
                 0 1 0 9.5 16c1.61 0 3.09-.59 
                 4.23-1.57l.27.28v.79l5 4.99L20.49 
                 19l-4.99-5zm-6 0C7.01 14 5 
                 11.99 5 9.5S7.01 5 9.5 5 14 
                 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </div>
      </div>

      <!-- Keine Ergebnisse -->
      <div v-if="filteredTerms.length === 0" class="no-results text-center py-8">
        Keine Einträge gefunden für „<strong>{{ searchQuery }}</strong>“ in 
        {{ selectedCategory }}
      </div>

      <!-- Liste aller Begriffe in der Kategorie -->
      <div v-else class="dictionary-list space-y-6 max-w-lg mx-auto">
        <div
          v-for="entry in filteredTerms"
          :key="entry.term"
          class="dictionary-card animate-fade-in delay-200"
          :class="{ 'is-expanded': expandedTerm === entry.term }"
        >
          <!-- Kartekopf mit Accordion-Icon -->
          <div @click="toggleEntry(entry.term)" class="card-header">
            <div class="term-container">
              <h3 class="term">{{ entry.term }}</h3>
            </div>
            <span class="expand-icon" :class="{ 'rotate-180': expandedTerm === entry.term }">
              <svg viewBox="0 0 24 24">
                <path
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 
                     10l-6 6-6-6 1.41-1.41z"
                />
              </svg>
            </span>
          </div>

          <!-- Karteinhalt (nur sichtbar, wenn expanded) -->
          <transition name="expand">
            <div v-if="expandedTerm === entry.term" class="card-content">
              <div class="definition mb-6">
                <p>{{ entry.definition }}</p>
              </div>
              <button @click.stop="openDetails(entry)" class="details-button mx-auto">
                Details
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- ========================= -->
    <!-- 4) DETAILS-MODAL          -->
    <!-- ========================= -->
    <transition name="modal">
      <div v-if="detailEntry" class="modal-overlay" @click.self="closeDetails">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ detailEntry.term }}</h2>
            <button class="modal-close" @click="closeDetails">
              <svg viewBox="0 0 24 24">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 
                     6.41 10.59 12 5 17.59 6.41 19 12 
                     13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <div v-if="detailEntry.kategorie" class="detail-item mb-4">
              <span class="detail-label">Kategorie:</span>
              <span class="detail-value">{{ detailEntry.kategorie }}</span>
            </div>

            <div v-if="detailEntry.beispiel" class="detail-item mb-4">
              <span class="detail-label">Beispiel:</span>
              <span class="detail-value italic">{{ detailEntry.beispiel }}</span>
            </div>

            <div v-if="detailEntry.herkunft" class="detail-item">
              <span class="detail-label">Herkunft:</span>
              <span class="detail-value">{{ detailEntry.herkunft }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dictionary from '../data/dictionary.json'

// --- VIEW STATE ---
const view = ref('landing')
const selectedCategory = ref(null)
const expandedTerm = ref(null)
const detailEntry = ref(null)
const searchQuery = ref('')
const landingSearch = ref('')
const randomEntry = ref(null)

const categories = computed(() => {
  const cats = dictionary.map(item => item.kategorie || 'Sonstige')
  return [...new Set(cats)]
})

const landingResults = computed(() => {
  const q = landingSearch.value.trim().toLowerCase()
  if (!q) return []
  return dictionary.filter(entry => {
    return (
      entry.term.toLowerCase().includes(q) ||
      entry.definition.toLowerCase().includes(q) ||
      (entry.beispiel && entry.beispiel.toLowerCase().includes(q))
    )
  })
})

const filteredTerms = computed(() => {
  if (!selectedCategory.value) return []
  const q = searchQuery.value.trim().toLowerCase()
  return dictionary
    .filter(entry => entry.kategorie === selectedCategory.value)
    .filter(entry => {
      if (!q) return true
      return (
        entry.term.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q) ||
        (entry.beispiel && entry.beispiel.toLowerCase().includes(q))
      )
    })
})

function goToCategories() {
  view.value = 'categories'
  searchQuery.value = ''
  landingSearch.value = ''
  expandedTerm.value = null
  selectedCategory.value = null
  detailEntry.value = null
  randomEntry.value = null
}

function goToLanding() {
  view.value = 'landing'
  searchQuery.value = ''
  landingSearch.value = ''
  expandedTerm.value = null
  selectedCategory.value = null
  detailEntry.value = null
  randomEntry.value = null
}

function selectCategory(cat) {
  selectedCategory.value = cat
  view.value = 'terms'
  searchQuery.value = ''
  expandedTerm.value = null
  detailEntry.value = null
  randomEntry.value = null
}

function toggleEntry(term) {
  expandedTerm.value = expandedTerm.value === term ? null : term
}

function showRandomTerm() {
  const idx = Math.floor(Math.random() * dictionary.length)
  randomEntry.value = dictionary[idx]
}

function clearRandom() {
  randomEntry.value = null
}

function openDetails(entry) {
  detailEntry.value = entry
}
function closeDetails() {
  detailEntry.value = null
}

const featuredList = ref(
  dictionary.slice(0, 3).map(item => ({
    term: item.term,
    definition: item.definition
  }))
)
const currentIndex = ref(0)
onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % featuredList.value.length
  }, 4000)
})
</script>

<style scoped>
/* ============================== */
/* Container & Top Padding (nav)  */
/* ============================== */
.dictionary-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  padding-top: 5rem; /* Platz für Navbar */
  padding-bottom: 3rem;
  background: #FFFFFF; /* komplett weiß */
}

/* =========================== */
/* 1) LANDING VIEW STYLES      */
/* =========================== */
.landing-view {
  text-align: center;
  padding-top: 1rem;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.landing-title {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1rem 0;
}

.landing-desc {
  color: #475569;
  font-size: 1.375rem;
  max-width: 640px;
  margin: 0 auto 3rem auto;
  line-height: 1.7;
}

.landing-buttons {
  display: flex;
  gap: 5rem;    /* ca. 80px Abstand */
  justify-content: center;
  margin-bottom: 2rem;
}

.landing-btn {
  background: #E0F2FF;
  color: #0F172A;
  border: 2px solid #B0D4F1;
  padding: 1.25rem 3rem;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.landing-btn:hover {
  background: #CFEFFF;
  transform: translateY(-2px);
}

.landing-search {
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
}

.landing-search-bar {
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
  background: #FFFFFF;
  border: 2px solid #CBD5E1;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.landing-search-bar:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
}

.landing-results {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem auto;
}

.result-card {
  margin-bottom: 0.75rem;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: #FFFFFF;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
}

.result-card .card-header {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F8FAFC;
}

/* 1.5) Zufälliger Begriff – Vorschau */
.random-preview {
  width: 100%;
  max-width: 700px;
  background: #F8FAFC;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.preview-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0F172A;
  text-align: center;
  margin-bottom: 1rem;
  width: 100%;
}

.preview-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.preview-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
}

.preview-icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.9;
}

.preview-text {
  flex: 1;
}

.preview-term {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.preview-definition {
  margin-top: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #475569;
}

.preview-extra {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #334155;
}

.btn-close-preview {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748B;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-close-preview:hover {
  color: #334155;
}

/* 1.6) Featured Term Teaser */
.featured-teaser {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  margin: 0 auto 2rem;
}

.featured-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
  text-align: center;
}

.featured-card {
  background: #F8FAFC;
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.featured-icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
}

.featured-icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.9;
}

.featured-text {
  flex: 1;
}

.featured-term {
  font-size: 1.25rem;
  color: #0F172A;
  margin: 0;
}

.featured-definition {
  font-size: 1rem;
  color: #475569;
  margin-top: 0.25rem;
  line-height: 1.5;
}

/* 1.7) Landing Footer-Hinweis */
.landing-footer {
  margin-top: 2rem;
  color: #94A3B8;
  font-size: 0.9rem;
}

/* =========================== */
/* 2) CATEGORIES VIEW STYLES   */
/* =========================== */
.categories-view .section-heading {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  color: #0F172A;
  margin: 0;
}

.categories-view .section-desc {
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1rem;
  color: #475569;
  text-align: center;
}

/* 3×3 Grid für Kategorien */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.category-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
}

/* Zurück-Button in Kategorien (klassisch blau) */
.back-button {
  background: #E0F2FF;
  color: #0F172A;
  border: 2px solid #B0D4F1;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.back-button:hover {
  background: #CFEFFF;
}

/* =========================== */
/* 3) TERMS VIEW STYLES        */
/* =========================== */
.terms-view {
  padding-bottom: 3rem;
}

.terms-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.terms-header .section-heading {
  font-size: 2.25rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.back-button-terms {
  background: #E0F2FF;
  color: #0F172A;
  border: 2px solid #B0D4F1;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-left: 1rem; /* Abstand nach rechts des Titels */
}

.back-button-terms:hover {
  background: #CFEFFF;
}

.search-container {
  max-width: 500px;
  margin: 0 auto 3rem;
}

.search-wrapper {
  position: relative;
}

.search-bar-term {
  width: 100%;
  min-width: 200px;
  padding: 0.9rem 1rem 0.9rem 3rem;
  font-size: 1rem;
  background: #FFFFFF;
  border: 2px solid #CBD5E1;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.search-bar-term:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.15);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.3rem;
  height: 1.3rem;
  fill: #94A3B8;
}

.no-results {
  font-size: 1.2rem;
  color: #64748B;
  background: #F8FAFC;
  border-radius: 12px;
  padding: 2rem;
  margin: 0 auto 2rem;
}

.dictionary-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dictionary-card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
}

.dictionary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
}

.dictionary-card.is-expanded {
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  background: #F8FAFC;
  transition: background 0.3s ease;
}

.card-header:hover {
  background: #F1F5F9;
}

.term-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.term {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.expand-icon {
  transition: transform 0.3s ease;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand-icon svg {
  width: 100%;
  height: 100%;
  fill: #94A3B8;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Card Content */
.card-content {
  padding: 1.5rem;
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
}

.definition {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #334155;
  margin-bottom: 1.5rem;
}

/* Details Button */
.details-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #E0F2FF;
  color: #0F172A;
  border: 2px solid #B0D4F1;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.details-button:hover {
  background: #CFEFFF;
  transform: translateY(-2px);
}

/* =========================== */
/* 4) MODAL STYLES             */
/* =========================== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  overflow: hidden;
  animation: modal-in 0.4s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1; 
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  padding: 1.25rem;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: #0F172A;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: #F1F5F9;
}

.modal-close svg {
  width: 1.5rem;
  height: 1.5rem;
  fill: #64748B;
}

.modal-body {
  padding: 2rem;
}

.detail-item {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-weight: 700;
  color: #0F172A;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.05rem;
  color: #334155;
  line-height: 1.6;
}

.italic {
  font-style: italic;
}

/* =========================== */
/* ANIMATION STYLES            */
/* =========================== */
/* Fade-In Keyframes */
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

/* Basisklasse für Fade-In */
.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

/* Verzögerungen */
.delay-200 {
  animation-delay: 0.2s;
}
.delay-400 {
  animation-delay: 0.4s;
}
.delay-600 {
  animation-delay: 0.6s;
}
.delay-800 {
  animation-delay: 0.8s;
}

/* =========================== */
/* Responsives Verhalten       */
/* =========================== */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .landing-btn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  .landing-buttons {
    flex-direction: column;
    gap: 1.5rem;
  }
  .categories-grid {
    grid-template-columns: 1fr;
  }
  .search-container,
  .landing-search {
    max-width: 100%;
    padding: 0 1rem;
  }
}
</style>
