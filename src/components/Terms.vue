<!-- src/pages/Terms.vue -->
<template>
  <div class="terms-page">
    <!-- Hero-Bereich -->
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">Terms &amp; Conditions</h1>
      </div>
    </section>

    <!-- Inhalt -->
    <section class="section content-section">
      <div class="container">
        <h2>Anwendungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (im Folgenden „AGB“) regeln die Nutzung
          der Webseite und der damit verbundenen Dienstleistungen von Schlaraffia Flensburgia
          e. V. (nachfolgend „Anbieter“ genannt).
        </p>

        <h3>Vertragsabschluss</h3>
        <p>
          Mit Nutzung dieser Website erkennen Sie diese AGB an. Ein gesonderter Vertrag
          kommt nicht zustande, soweit kein anderes ausdrücklich vereinbart ist.
        </p>

        <h3>Leistungsbeschreibung</h3>
        <p>
          Der Anbieter stellt über die Internetseite Informationen, Veranstaltungshinweise
          und Kontaktmöglichkeiten zur Verfügung. Darüber hinausgehende Leistungen erfolgen
          nur bei gesonderter Vereinbarung.
        </p>

        <h3>Haftung</h3>
        <p>
          Der Anbieter haftet nur für Schäden, die auf vorsätzlicher oder grob fahrlässiger
          Pflichtverletzung beruhen. Eine Haftung für leichte Fahrlässigkeit ist ausgeschlossen,
          es sei denn, es handelt sich um Schäden aus der Verletzung des Lebens, des Körpers
          oder der Gesundheit.
        </p>

        <h3>Datenschutz</h3>
        <p>
          Informationen zum Datenschutz finden Sie in unserer
          <router-link to="/privacy">Privacy Policy</router-link>.
        </p>

        <h3>Änderung der AGB</h3>
        <p>
          Der Anbieter behält sich vor, diese AGB jederzeit zu ändern. Die jeweils aktuelle
          Version ist auf der Webseite abrufbar.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

onMounted(() => {
  nextTick(() => {
    document.querySelectorAll('.animate-target').forEach(el => {
      el.classList.add('animate-in')
    })
  })
})
</script>

<style scoped>
.terms-page {
  background: #ffffff;
  min-height: 100vh;
}

/* Hero-Bereich */
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

/* Text-Abschnitt */
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

h2, h3 {
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
