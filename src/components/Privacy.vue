<template>
  <div class="privacy-page">
    <section class="hero-plain">
      <div class="content-wrapper">
        <h1 ref="heroTitle" class="hero-title animate-target">Privacy Policy</h1>
      </div>
    </section>

    <!-- Inhalt -->
    <section class="section content-section">
      <div class="container">
        <!-- Geltungsbereich -->
        <h2>Geltungsbereich</h2>
        <p>
          Diese Datenschutzerklärung soll die Nutzer dieser Website gemäß Bundesdatenschutzgesetz
          und Telemediengesetz über die Art, den Umfang und den Zweck der Erhebung und Verwendung
          personenbezogener Daten durch den Verein „Schlaraffia Flensburgia“ informieren.
          <br /><br />
          Wir nehmen den Schutz Ihrer Daten sehr ernst und behandeln Ihre personenbezogenen Daten
          vertraulich und entsprechend der gesetzlichen Vorschriften.
          <br /><br />
          Bedenken Sie bitte, dass die Datenübertragung im Internet grundsätzlich Sicherheitslücken
          aufweisen kann. Ein vollumfänglicher Schutz vor dem Zugriff durch Fremde ist nicht realisierbar.
        </p>

        <!-- Zugriffsdaten -->
        <h2>Zugriffsdaten</h2>
        <p>
          Wir als Websitebetreiber bzw. der Seitenprovider erheben Daten über Zugriffe auf die Seite
          und speichern diese als „Server-Logfiles“ ab. Folgende Daten werden so protokolliert:
        </p>
        <ul>
          <li>Besuchte Website</li>
          <li>Uhrzeit zum Zeitpunkt des Zugriffes</li>
          <li>Menge der gesendeten Daten in Byte</li>
          <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
          <li>Verwendeter Browser</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Verwendete IP-Adresse</li>
        </ul>
        <p>
          Die erhobenen Daten dienen lediglich statistischen Auswertungen und der Verbesserung der Website.
          Wir behalten uns allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete
          Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
        </p>

        <!-- Cookies -->
        <h2>Cookies</h2>
        <p>
          Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, welche auf Ihrem
          Endgerät gespeichert werden. Ihr Browser greift auf diese Dateien zu. Durch den Einsatz von Cookies
          erhöht sich die Benutzerfreundlichkeit und Sicherheit dieser Website. Gängige Browser bieten die
          Einstellungsoption, Cookies nicht zuzulassen. Hinweis: Es ist nicht gewährleistet, dass Sie auf
          alle Funktionen dieser Website ohne Einschränkungen zugreifen können, wenn Sie entsprechende
          Einstellungen vornehmen.
        </p>

        <!-- Umgang mit personenbezogenen Daten -->
        <h2>Umgang mit personenbezogenen Daten</h2>
        <p>
          Wir erheben, nutzen und geben Ihre personenbezogenen Daten nur weiter, wenn dies im gesetzlichen
          Rahmen erlaubt ist oder Sie in die Datenerhebung einwilligen.  
          Als personenbezogene Daten gelten sämtliche Informationen, welche dazu dienen, Ihre Person zu
          bestimmen und welche zu Ihnen zurückverfolgt werden können – also beispielsweise Ihr Name, Ihre
          E-Mail-Adresse und Telefonnummer.
        </p>

        <!-- Umgang mit Kontaktdaten -->
        <h2>Umgang mit Kontaktdaten</h2>
        <p>
          Nehmen Sie mit uns durch die angebotenen Kontaktmöglichkeiten Verbindung auf, werden Ihre Angaben
          gespeichert, damit auf diese zur Bearbeitung und Beantwortung Ihrer Anfrage zurückgegriffen
          werden kann. Ohne Ihre Einwilligung werden diese Daten nicht an Dritte weitergegeben.
        </p>

        <!-- Umgang mit Kommentaren und Beiträgen -->
        <h2>Umgang mit Kommentaren und Beiträgen</h2>
        <p>
          Es gibt keine Möglichkeit, auf dieser Webseite einen Beitrag oder Kommentar zu hinterlassen.
        </p>

        <!-- Rechte des Nutzers -->
        <h2>Rechte des Nutzers: Auskunft, Berichtigung und Löschung</h2>
        <p>
          Als Nutzer erhalten Sie auf Antrag kostenlose Auskunft darüber, welche personenbezogenen Daten
          über Sie gespeichert wurden. Sofern Ihr Wunsch nicht mit einer gesetzlichen Pflicht zur
          Aufbewahrung von Daten (z. B. Vorratsdatenspeicherung) kollidiert, haben Sie ein Anrecht auf
          Berichtigung falscher Daten und auf die Sperrung oder Löschung Ihrer personenbezogenen Daten.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const heroTitle = ref(null)

onMounted(() => {
  if (heroTitle.value) {
    heroTitle.value.classList.add('animate-in')
  }
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

h2 {
  color: #1d1d1f;
  margin-top: 1.5rem;
}

p, ul, li {
  color: #374151;
  line-height: 1.6;
  margin-top: 0.5rem;
}

/* Listen-Stil */
ul {
  margin-left: 1rem;
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
