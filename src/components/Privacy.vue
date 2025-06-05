<template>
  <div class="privacy-page">
    <!-- Hero-Bereich -->
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 class="hero-title animate-target">Privacy Policy</h1>
      </div>
    </section>

    <!-- Inhalt -->
    <section class="section content-section">
      <div class="container">
        <h2>Datenschutzerklärung</h2>
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir 
          Sie, welche personenbezogenen Daten wir erheben und wie wir sie verwenden.
        </p>

        <h3>Erhebung und Verarbeitung persönlicher Daten</h3>
        <p>
          Wir verarbeiten personenbezogene Daten, wenn Sie uns diese von sich aus, zum 
          Beispiel im Kontaktformular, mitteilen.  
          Folgende Daten können erhoben werden: Name, E-Mail-Adresse, IP-Adresse.
        </p>

        <h3>Zwecke der Datenverarbeitung</h3>
        <p>
          Wir verwenden die Daten, um Ihre Anfragen zu bearbeiten, Sie über Veranstaltungen 
          zu informieren oder statistische Auswertungen vorzunehmen.
        </p>

        <h3>Rechtsgrundlage</h3>
        <p>
          Die Verarbeitung erfolgt nach Art. 6 Abs. 1 lit. b DSGVO zur Erfüllung unserer 
          vertraglichen Pflichten und zur Beantwortung Ihrer Kontaktanfragen.
        </p>

        <h3>Datenweitergabe</h3>
        <p>
          Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn dies zur Vertragserfüllung 
          notwendig ist oder wir gesetzlich dazu verpflichtet sind.
        </p>

        <h3>Cookies und Tracking</h3>
        <p>
          Wir verwenden keine Cookies zur Speicherung personenbezogener Daten. 
          Statistische Auswertungen erfolgen anonymisiert.
        </p>

        <h3>Betroffenenrechte</h3>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der 
          Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich dazu bitte an die 
          im Impressum genannten Kontaktdaten.
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
.privacy-page {
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
