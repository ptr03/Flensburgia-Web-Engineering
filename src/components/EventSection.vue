<template>
  <section class="events-section">
    <div class="content-wrapper">
      <!-- ‣ FALLS KEIN EVENT AUSGEWÄHLT IST UND ES EVENTS GIBT: Zentrierter Horizontal-Scroll -->
      <div
        v-if="!selectedEvent && events.length"
        class="horizontal-scroll-wrapper"
      >
        <div class="horizontal-scroll-container">
          <div
            v-for="(event, index) in events"
            :key="event.id"
            class="scroll-item"
          >
            <button class="event-button" @click="selectEvent(event)">
              {{ event.title }}
            </button>
          </div>
        </div>
      </div>

      <!-- ‣ FALLS KEIN EVENT DA IST -->
      <p v-else-if="!events.length" class="no-events-message">
        Momentan sind keine geplanten Veranstaltungen eingetragen.
      </p>

      <!-- ‣ FALLS EIN EVENT AUSGEWÄHLT IST: Detail-Ansicht -->
      <div v-else-if="selectedEvent" class="detail-container">
        <button class="btn-back" @click="selectedEvent = null">
          ← Zurück zu allen Events
        </button>
        <div class="detail-card">
          <!-- Bild oben (falls vorhanden) -->
          <img
            v-if="getImageUrl(selectedEvent.image)"
            :src="getImageUrl(selectedEvent.image)"
            :alt="selectedEvent.title"
            class="detail-image"
          />

          <div class="detail-text">
            <h3 class="detail-title">{{ selectedEvent.title }}</h3>
            <time class="detail-date">{{ formatDate(selectedEvent.date) }}</time>
            <p class="detail-description">{{ selectedEvent.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import eventsData from '../data/events.json'
import { ref } from 'vue'

// ‣ Statischer Import der Events aus JSON
const events = ref(eventsData || [])

// ‣ State für das aktuell ausgewählte Event
const selectedEvent = ref(null)

// ‣ Methode zum Auswählen eines Events
function selectEvent(event) {
  selectedEvent.value = event
}

// ‣ Datum im deutschen Format
function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// ‣ Helfer-Funktion, die mit Vite new URL() das Asset lädt
function getImageUrl(filename) {
  if (!filename) return null
  try {
    return new URL(`../assets/pictures/events/${filename}`, import.meta.url).href
  } catch {
    return null
  }
}
</script>

<style scoped>
/* =========================== */
/* EventSection.vue CSS        */
/* =========================== */

.events-section {
  background: #ffffff;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  display: flex;
  justify-content: center;
}

.content-wrapper {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

/* =========================== */
/* Fallback-Meldung: keine Events */
/* =========================== */
.no-events-message {
  color: #475569;
  font-size: 1rem;
  margin-top: 2rem;
}

/* =========================== */
/* Zentrierter Horizontal-Scroll-Wrapper */
/* =========================== */
.horizontal-scroll-wrapper {
  overflow-x: auto;
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem; /* Platz für Scrollbar */
}

/* =========================== */
/* Horizontal-Scroll-Container  */
/* =========================== */
.horizontal-scroll-container {
  display: flex;
  gap: 1rem;
}

.horizontal-scroll-container::-webkit-scrollbar {
  height: 8px;
}
.horizontal-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}
.horizontal-scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* =========================== */
/* Fade-In-Animation für Buttons */
/* =========================== */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.scroll-item {
  flex: 0 0 auto;       /* Keine Flex-Grow/Shrink */
  width: 200px;
  aspect-ratio: 1 / 1;   /* Höhe = Breite */
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
  /* Jeder Button fängt mit 0 an und blendet nach 0.6s auf Opazität 1 */
}

/* =========================== */
/* Quadrat-Button (Kategorie-Stil) */
/* =========================== */
.event-button {
  width: 100%;
  height: 100%;
  background: #f3f4f6; /* heller Grauton, wie bei Kategorie-Buttons */
  color: #1d1d1f;      /* dunkles Schwarz für Text */
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
}

/* Hover-Effekt: etwas tieferer Schatten und Hintergrund leicht aufgehellt */
.event-button:hover {
  background: #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* =========================== */
/* Detail-Ansicht              */
/* =========================== */
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

/* Zurück-Button */
.btn-back {
  align-self: flex-start;
  margin-bottom: 1.5rem;
  background: none;
  border: none;
  color: #0ea5e9;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-back:hover {
  color: #0369a1;
}

/* Detail Card */
.detail-card {
  width: 100%;
  max-width: 600px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.detail-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.detail-text {
  padding: 1.5rem;
  text-align: left;
}

.detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.detail-date {
  display: block;
  color: #0ea5e9;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.detail-description {
  font-size: 1rem;
  color: #475569;
  line-height: 1.5;
  margin: 0;
}
</style>