# Schlaraffia Flensburgia – Vereinswebsite

**Beschreibung**
Dies ist die offizielle Vereinswebsite der Schlaraffia Flensburgia e. V. (Flensburg).
Sie basiert auf [Vite](https://vitejs.dev/) und [Vue 3](https://vuejs.org/).
Ziel ist es, alle wichtigen Informationen zu Sippungen, Flensburgen, Kontakt und Rechtlichem übersichtlich bereitzustellen.

---

## 🚀 Lokales Setup

1. Repository klonen:

   ```
   git clone <URL-zum-Repo>
   cd <dein-repo-ordner>
   ```
2. Abhängigkeiten installieren:

   ```
   npm install
   ```
3. Entwicklungsserver starten:

   ```
   npm run dev
   ```

   Danach ist die Seite unter `http://localhost:3000` erreichbar (Port kann variieren).
4. Build für Produktion:

   ```
   npm run build
   ```

---

## 📁 Ordnerstruktur

```
.
├─ .vscode/
├─ node_modules/
├─ public/
│   └─ vite.svg
├─ src/
│  ├─ assets/
│  │  ├─ icons/
│  │  └─ pictures/
│  │     ├─ flensburgen/
│  │     │  └─ (Bilder für Flensburgen-Section)
│  │     ├─ sippungen/
│  │     │  └─ (Bilder für Sippungsfolge-Section)
│  ├─ components/
│  │   ├─ AboutPage.vue
│  │   ├─ AboutSection.vue
│  │   ├─ CardSection.vue
│  │   ├─ ContactPage.vue
│  │   ├─ DictionaryPage.vue
│  │   ├─ DictionarySection.vue
│  │   ├─ EventSection.vue
│  │   ├─ FlensburgenPage.vue
│  │   ├─ FlensburgenSection.vue
│  │   ├─ Footer.vue
│  │   ├─ HeroSection.vue
│  │   ├─ HomePage.vue
│  │   ├─ Impressum.vue
│  │   ├─ NavigationBar.vue
│  │   ├─ NewsletterSection.vue
│  │   ├─ Privacy.vue
│  │   ├─ SippungsfolgePage.vue
│  │   ├─ SippungsfolgeSection.vue
│  │   ├─ SippungsModal.vue
│  │   ├─ Terms.vue
│  │   ├─ TimelinePage.vue
│  │   ├─ TimelineSection.vue
│  │   ├─ TourPage.vue
│  │   ├─ TourSection.vue
│  ├─ data/
│  │   ├─ aktuelles.json
│  │   ├─ dictionary.json
│  │   ├─ events.json
│  │   ├─ flensburgen.json
│  │   ├─ rodeGruetteText.md
│  │   ├─ sippungsfolge.json
│  │   ├─ timeline.json
│  │   ├─ tour-stops.json
│  │   └─ windjammerText.md
│  ├─ App.vue
│  ├─ main.js
│  ├─ router.js
│  └─ style.css
├─ README.md
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.js
```

---

## 🔧 Arbeiten mit JSON-Daten

* **`src/data/aktuelles.json`**
  Liste der „Aktuelles“-Texte. Beispielstruktur:

  ```json
  [
    { "id": 1, "text": "Aktueller Hinweis 1" },
    { "id": 2, "text": "Aktueller Hinweis 2" }
  ]
  ```
* **`src/data/events.json`**
  Kommende Veranstaltungen. Beispiel:

  ```json
  [
    {
      "id": 1,
      "date": "15. Oktober 2024",
      "title": "Kulturerbe-Symposium",
      "excerpt": "Beschreibung..."
    },
    {
      "id": 2,
      "date": "2.–4. November 2024",
      "title": "Traditionelles Kunstfestival",
      "excerpt": "Beschreibung..."
    }
  ]
  ```
* **`src/data/flensburgen.json`**
  Datenstruktur für Flensburgen-Section (IDs, Namen, Bilddateinamen).
* **`src/data/sippungsfolge.json`**
  Alle Sippungs-Termine (Datum, Titel, Beschreibung, ID).
* **`src/data/timeline.json`**
  Einträge für die historische Timeline (Jahr + Beschreibung).
* **`src/data/tour-stops.json`**
  Daten für Tour-Seite (Stops, Beschreibungen, Koordinaten usw.).
* **`src/data/rodeGruetteText.md`** / **`src/data/windjammerText.md`**
  Markdown-Texte für Flensburgen-Section (Röde Grütt bzw. Windjammerorden).

Wenn du „Aktuelles“, „Events“ oder andere Daten ändern möchtest, bearbeite einfach die entsprechende JSON-Datei im Ordner `src/data/`.

---

## 🔍 Routenübersicht

* `/` → **HomePage.vue**
* `/about` → **AboutPage.vue**
* `/sippungsfolge` → **SippungsfolgePage.vue**
* `/die-flensburgen` → **FlensburgenPage.vue**
* `/dictionary` → **DictionaryPage.vue**
* `/contact` → **ContactPage.vue**
* `/impressum` → **Impressum.vue**
* `/terms` → **Terms.vue**
* `/privacy` → **Privacy.vue**

---

## 👩🏻‍💻 Hinweise für Entwickler

* **Globale CSS-Variablen** findest du in `src/style.css`. Farben, Abstände, Schatten und Radii sind dort definiert.
* **Fade-In-Animationen**: Fast jede Seite verwendet die Klassen `.animate-target` + `.animate-in`. Beispiel im Script:

  ```js
  onMounted(() => {
    nextTick(() => {
      document.querySelectorAll('.animate-target')
        .forEach(el => el.classList.add('animate-in'))
    })
  })
  ```
* **Responsive Design**: Media Queries in den scoped-Styles; mobiles Menü in `NavigationBar.vue`.
* **Image-Loading**: Bilder unter `src/assets/pictures/...` werden mit `import.meta.glob` automatisch eingebunden.

---

## 📈 Ausblick / To-Do

* Backend-Anbindung für das Kontaktformular (E-Mail-Service oder Serverless-API).
* Endgültige Rechtstexte (von Juristen prüfen lassen).
* Erweiterung um Mitgliederbereich, Mitgliederliste oder passwortgeschützte Bereiche.
* Fotos-Galerie oder Event-Archiv erweitern.

---

Schlaraffia Flensburgia e. V.

```
```
