<template>
  <section class="newsletter-section">
    <div class="content-wrapper">
      <!-- Titel -->
      <h1 class="section-title">Bleibe immer auf dem Laufenden</h1>
      <p class="section-subtitle">
        Melde dich für unseren Newsletter an und erhalte exklusive Neuigkeiten, Einladungen zu
        Events und Sonderaktionen.
      </p>

      <!-- Liste der Vorteile -->
      <ul class="benefits-list">
        <li>📰 Exklusive Einblicke in kommende Veranstaltungen</li>
        <li>🎉 Einladungen zu Special-Events und Konzerten</li>
        <li>💰 Sonderangebote und Rabatte</li>
      </ul>

      <!-- Formular -->
      <div class="form-wrapper">
        <input
          v-model="email"
          type="email"
          placeholder="Deine E-Mail-Adresse"
          class="email-input"
        />
        <button @click="subscribe" class="btn-subscribe">Abonnieren</button>
      </div>

      <!-- Feedback-Nachricht -->
      <p v-if="message" :class="{'message-success': isSuccess, 'message-error': !isSuccess}" class="message">
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
  // ganz simple Validierung
  if (!e || !e.includes('@') || e.length < 5) {
    isSuccess.value = false
    message.value = 'Bitte gib eine gültige E-Mail-Adresse ein.'
    return
  }

  // Hier könnte man später einen API-Call einbauen.
  isSuccess.value = true
  message.value = 'Danke für dein Abo! 🎉'
  email.value = ''
}
</script>

<style scoped>
/* ===================================== */
/* NewsletterSection.vue                 */
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

/* Gradient-Titel wie bei anderen Seiten */
.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Untertitel */
.section-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #334155;
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
  color: #475569;
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

/* E-Mail-Input (gestylt wie Suchfeld) */
.email-input {
  flex: 1 1 250px;
  max-width: 400px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: border 0.3s, box-shadow 0.3s;
}
.email-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.1);
}

/* Abonnieren-Button */
.btn-subscribe {
  padding: 0.75rem 1.5rem;
  background: #0ea5e9;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.btn-subscribe:hover {
  background: #0369a1;
  transform: scale(1.02);
}

/* Feedback-Nachricht */
.message {
  font-size: 0.95rem;
  margin-top: 0.5rem;
}
.message-success {
  color: #15803d; /* grün */
}
.message-error {
  color: #b91c1c; /* rot */
}
</style>
