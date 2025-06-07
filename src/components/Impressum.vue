<!-- src/pages/Impressum.vue -->
<template>
  <div class="impressum-page">
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 ref="heroTitle" class="hero-title animate-target">Impressum</h1>
      </div>
    </section>

    <!-- Inhalt -->
    <section class="section content-section">
      <div class="container">
        <!-- Haftungshinweis -->
        <h2>Haftungshinweis</h2>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
          Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
          deren Betreiber verantwortlich.
        </p>

        <!-- Bildnachweise -->
        <h2>Bildnachweise</h2>
        <p>
          Alle eingestellten Bilder sind nachweislich Eigentum der Schlaraffia Flensburgia
          oder werden freiwillig von Mitgliedern der Schlaraffia zur Verfügung gestellt.
          <br /><br />
          Zur Wahrung der Persönlichkeitsrechte am eigenen Bild hat jede abgelichtete und hier
          zu sehende Person vorher ihre Einwilligung schriftlich erteilt!
        </p>

        <!-- Betreiber / Herausgeber -->
        <h2>Betreiber / Herausgeber dieser Website</h2>
        <p>
          Schlaraffia Flensburgia e. V.<br />
          Händelhof 7<br />
          24394 Flensburg
        </p>

        <h3>Vertretungsberechtigt</h3>
        <p>
          Franz Dewanger (Ritter Wohlbedacht)<br />
          24980 Meyn / Am Mühlenteich 2<br />
          Telefon: 04639 78064<br />
          E-Mail: f.dewanger(at)t-online.de
        </p>

        <h3>Registereintrag</h3>
        <p>
          Eintragung im Vereinsregister.<br />
          Registergericht: Amtsgericht Flensburg<br />
          Registernummer: VR 1234 FI
        </p>

        <h3>Netzvogt</h3>
        <p>
          Andreas Ovens (Kn244)<br />
          Händelhof 7, 24394 Flensburg<br />
          E-Mail: andreas.ovens@gmx.de
        </p>

        <h3>Umsatzsteuer-ID</h3>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE 123456789
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue'

const heroTitle = ref(null)

onMounted(() => {
  requestAnimationFrame(() => {
    if (heroTitle.value) {
      heroTitle.value.classList.add('animate-in')
    }
  })
})
</script>

<style scoped>
.impressum-page {
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
