<!-- src/pages/Impressum.vue -->
<template>
  <div class="impressum-page">
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">Impressum</h1>
      </div>
    </section>

    <section class="section content-section">
      <div class="container">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Schlaraffia Flensburgia e. V.<br />
          Musterstraße 123<br />
          24937 Flensburg
        </p>

        <h3>Vertreten durch</h3>
        <p>
          Vorstand: Rt Beispielname (Erster Vorsitzender)<br />
          Rt Musterfrau (Zweiter Vorsitzender)
        </p>

        <h3>Kontakt</h3>
        <p>
          Telefon: 0461 1234567<br />
          E-Mail: kontakt@flensburgia.de
        </p>

        <h3>Registereintrag</h3>
        <p>
          Eintragung im Vereinsregister.<br />
          Registergericht: Amtsgericht Flensburg<br />
          Registernummer: VR 1234 FI
        </p>

        <h3>Umsatzsteuer-ID</h3>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 123456789
        </p>

        <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>
          Rt Beispielname<br />
          Musterstraße 123<br />
          24937 Flensburg
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

onMounted(() => {
  nextTick(() => {
    document
      .querySelectorAll('.animate-target')
      .forEach(el => el.classList.add('animate-in'))
  })
})
</script>

<style scoped>
.impressum-page {
  background: #ffffff;
  min-height: 100vh;
}

/* Hero-Bereich analog zu anderen Seiten */
.hero-plain {
  padding-top: 64px;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.content-wrapper {
  text-align: center;
  max-width: 800px;
  padding: 0 1.5rem;
}

.hero-title {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(to right, #0ea5e9, #0369a1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.section {
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
}

.content-section {
  background-color: #ffffff;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h2,
h3 {
  color: #1d1d1f;
  margin-top: 1.5rem;
}

p {
  color: #374151;
  line-height: 1.6;
  margin-top: 0.5rem;
}

/* Fade-In Animation */
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
  animation: fadeInUp 0.8s ease-out forwards;
}
.animate-target {
  opacity: 0;
  transform: translateY(20px);
}
</style>
