<template>
  <section class="newsletter-section">
    <div class="content-wrapper">
      <!-- Titel -->
      <h1 class="section-title">
        Der Hofstaat‐Bote der Erz- & Ehrenschlaraffen
      </h1>
      <p class="section-subtitle">
        Trage Dich ein und empfange künftig erlesene Schlaraffen-Notizen, Einladungen zu versiegelten Runden und Sonderkulinarien.
      </p>

      <!-- Liste der Vorteile -->
      <ul class="benefits-list">
        <li>📜 Erlesene Schlaraffen-Notizen direkt in Dein Posthorn</li>
        <li>☕ Einladungen zu Kaffeeklatsch-Zünften und konspirativen Bänken</li>
        <li>🍰 Zugang zu Sonderkulinarien, Krapfen-Extravaganzen und Gesangsstunden</li>
      </ul>

      <!-- Formular -->
      <div class="form-wrapper">
        <input
          v-model="email"
          type="email"
          placeholder="Eure ehrwürdige E-Mail-Adresse"
          class="email-input"
        />
        <button @click="subscribe" class="btn-subscribe">
          In den Boten eintragen
        </button>
      </div>

      <!-- Feedback-Nachricht -->
      <p
        v-if="message"
        :class="{ 'message-success': isSuccess, 'message-error': !isSuccess }"
        class="message"
      >
        {{ message }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')
const isSuccess = ref(false)

function subscribe() {
  const e = email.value.trim()
  // einfache Validierung
  if (!e || !e.includes('@') || e.length < 5) {
    isSuccess.value = false
    message.value = 'Oh weh! Bitte gib eine gültige E-Mail-Adresse ein, edler Schlaraffe.'
    return
  }

  // Hier später echter API-Call – zurzeit nur simuliert
  isSuccess.value = true
  message.value = 'Dein Kürschner hat Dich im Boten verzeichnet. Mit schlaraffenischem Gruß!'
  email.value = ''
}
</script>

<style scoped>
/* ===================================== */
/* NewsletterSection.vue (Schlaraffen-Stil) */
/* ===================================== */

.newsletter-section {
  background: #ffffff;
  padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: center;
}

.content-wrapper {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

/* Gradient-Titel im Schlaraffen-Look */
.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #a16428, #7b4513);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Untertitel */
.section-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #4b3a27;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

/* Vorteile als Liste */
.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0 auto 2rem;
  max-width: 400px;
  text-align: left;
}
.benefits-list li {
  font-size: 1rem;
  color: #5a462e;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Formular-Wrapper (Input + Button nebeneinander) */
.form-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* E-Mail-Input (gestylt wie Schlaraffen-Schriftrolle) */
.email-input {
  flex: 1 1 250px;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #c0a18e;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: border 0.3s, box-shadow 0.3s;
  background: #f9f1e7;
}
.email-input:focus {
  outline: none;
  border-color: #7b4513;
  box-shadow: 0 4px 8px rgba(123, 69, 19, 0.2);
}

/* Abonnieren-Button im Schlaraffen-Stil */
.btn-subscribe {
  padding: 0.75rem 1.5rem;
  background: #a16428;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.btn-subscribe:hover {
  background: #7b4513;
  transform: scale(1.02);
}

/* Feedback-Nachricht */
.message {
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
.message-success {
  color: #2d572c; /* ein gedecktes Grün */
}
.message-error {
  color: #8b1a1a; /* ein dunkles Rot */
}
</style>
