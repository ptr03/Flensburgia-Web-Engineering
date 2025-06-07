<!-- src/pages/ContactPage.vue -->
<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="content-wrapper">
        <h1 class="section-title animate-target">Kontakt</h1>
        <p class="section-subtitle animate-target">
          Wir stehen Ihnen gerne zur Verfügung – schreiben Sie uns oder rufen Sie an.
        </p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <!-- Kontaktinformationen -->
        <div class="contact-info animate-target">
          <h2 class="contact-heading">Unsere Ansprechpartner</h2>
          <ul class="contact-list">
            <li>
              <span class="contact-label">Ritter Couplet (Frank Jähnig):</span>
              <a href="tel:+4946120791" class="contact-link">0461 20791</a> •
              <a href="mailto:couplet@t-online.de" class="contact-link">couplet@t-online.de</a>
            </li>
            <li>
              <span class="contact-label">Ritter Pedro Nero (Peter Gregersen):</span>
              <a href="tel:+4946341861" class="contact-link">04634 1861</a> •
              <a href="mailto:pesimabe@t-online.de" class="contact-link">pesimabe@t-online.de</a>
            </li>
          </ul>
        </div>

        <!-- Kontaktformular -->
        <div class="contact-form-wrapper animate-target">
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
                rows="7"
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

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      success: false
    }
  },
  methods: {
    submitForm() {
      this.success = true
      // clear fields
      this.form.name = ''
      this.form.email = ''
      this.form.message = ''
      // hide after 5s
      setTimeout(() => {
        this.success = false
      }, 5000)
    }
  },
  mounted() {
    // animate-in the hero immediately
    this.$nextTick(() => {
      document
        .querySelectorAll('.section-title, .section-subtitle')
        .forEach(el => el.classList.add('animate-in'))
    })
    // intersection observer for the rest
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document
      .querySelectorAll('.animate-target')
      .forEach(el => observer.observe(el))
  }
})
</script>


<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  min-height: 100vh;
}

.contact-hero {
  background: #ffffff;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  text-align: center;
  margin-top: 64px;
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
  opacity: 0;
  transform: translateY(20px);
}

.section-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #334155;
  margin-top: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
}

.contact-section {
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

.contact-info {
  flex: 1 1 300px;
  opacity: 0;
  transform: translateY(20px);
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

.contact-form-wrapper {
  flex: 1 1 500px;
  opacity: 0;
  transform: translateY(20px);
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

.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

@media (max-width: 992px) {
  .container {
    flex-direction: column;
  }
  .contact-info,
  .contact-form-wrapper {
    width: 100%;
  }
}
</style>
