<!-- src/pages/ContactPage.vue -->
<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="content-wrapper">
        <h1 class="section-title">Kontakt</h1>
        <p class="section-subtitle">
          Wir stehen Ihnen gerne zur Verfügung – schreiben Sie uns oder rufen Sie an.
        </p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <!-- Kontaktinformationen -->
        <div class="contact-info">
          <h2 class="contact-heading">Unsere Ansprechpartner</h2>
          <ul class="contact-list">
            <li>
              <span class="contact-label">Ritter Couplet (Frank Jähnig):</span>
              <a href="tel:+4946120791" class="contact-link">0461 20791</a>
              •
              <a href="mailto:couplet@t-online.de" class="contact-link">couplet@t-online.de</a>
            </li>
            <li>
              <span class="contact-label">Ritter Pedro Nero (Peter Gregersen):</span>
              <a href="tel:+4946341861" class="contact-link">04634 1861</a>
              •
              <a href="mailto:pesimabe@t-online.de" class="contact-link">pesimabe@t-online.de</a>
            </li>
          </ul>
        </div>

        <!-- Kontaktformular -->
        <div class="contact-form-wrapper">
          <h2 class="contact-heading">Kontaktformular</h2>
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Ihr Name"
              />
            </div>
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Ihre E-Mail-Adresse"
              />
            </div>
            <div class="form-group">
              <label for="message">Nachricht</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                placeholder="Ihre Nachricht"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Absenden</button>
            <p v-if="success" class="form-success">Ihre Nachricht wurde gesendet!</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})
const success = ref(false)

function submitForm() {
  // Hier könnte eine API-Anfrage erfolgen. Zum Demo nur Feedback anzeigen.
  success.value = true
  // Formular zurücksetzen
  form.value.name = ''
  form.value.email = ''
  form.value.message = ''
  // Erfolgsnachricht nach 5 Sekunden ausblenden
  setTimeout(() => (success.value = false), 5000)
}
</script>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  min-height: 100vh;
}

.contact-hero {
  background: #f1f5f9;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  text-align: center;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #0ea5e9;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #334155;
  margin-top: 0.5rem;
}

.contact-section {
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Kontaktinformationen */
.contact-info {
  flex: 1 1 300px;
}

.contact-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #374151;
}

.contact-label {
  font-weight: 500;
  margin-right: 0.25rem;
}

.contact-link {
  color: #0ea5e9;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

/* Kontaktformular */
.contact-form-wrapper {
  flex: 1 1 400px;
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #111827;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 4px 8px rgba(14, 165, 233, 0.1);
}

.btn-primary {
  align-self: flex-start;
  padding: 0.75rem 2rem;
  background-color: #0ea5e9;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.2s;
}

.btn-primary:hover {
  background-color: #0369a1;
  transform: translateY(-2px);
}

.form-success {
  margin-top: 1rem;
  color: #16a34a;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .contact-info,
  .contact-form-wrapper {
    width: 100%;
  }
}
</style>
