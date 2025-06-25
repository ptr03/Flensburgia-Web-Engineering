# Schlaraffia Flensburgia – Vereinswebsite
Gruppe PVAK
Piotr Michalkiewicz, Quang Vinh Pham, Alexander Vaymer, Kanat Arngold

**Offizielle Website der Schlaraffia Flensburgia e. V. (Flensburg)**

Diese Anwendung basiert auf [Vite](https://vitejs.dev/) und [Vue 3](https://vuejs.org/) und dient zur übersichtlichen Darstellung aller Vereins‑Inhalte: Sippungsfolgen, Flensburgen, Events, Glossar und rechtliche Informationen.

---

## 🚀 Lokales Setup

1. **Repository klonen**

   ```bash
   git clone https://github.com/ptr03/Flensburgia-Web-Engineering.git
   cd Flensburgia-Web-Engineering
   ```
2. **Abhängigkeiten installieren**

   ```bash
   npm install
   ```
3. **Entwicklungsserver starten**

   ```bash
   npm run dev
   ```

   Nach dem Start ist die Seite unter `http://localhost:3000` erreichbar.
4. **Build für Produktion**

   ```bash
   npm run build
   ```

---

## 📁 Projektstruktur

```
.
├─ .vscode/
├─ node_modules/
├─ public/
│   └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ pictures/
│  │     ├─ events/
│  │     │  └─ kaffeklatsch.png       # Beispiel-Event-Bild
│  │     ├─ flensburgen/
│  │     │  ├─ Ehrenschlarraffen/
│  │     │  ├─ Erzschlaraffen/
│  │     │  └─ Sassen/
│  │     └─ sippungen/
│  │        ├─ 3178.jpg
│  │        ├─ 3179.jpg
│  │        ├─ 3184.jpg
│  │        ├─ 3185.jpg
│  │        └─ placeholder.jpg        # Platzhalter-Bild
│  ├─ components/                    # Vue-Komponenten
│  │   ├─ AboutPage.vue
│  │   ├─ SippungsfolgeSection.vue
│  │   └─ ...
│  ├─ data/                          # JSON‑ und Markdown‑Inhalte
│  │   ├─ aktuelles.json             # Aktuelle Hinweise
│  │   ├─ dictionary.json            # Glossar (Begriffe)
│  │   ├─ events.json                # Events und Termine
│  │   ├─ flensburgen.json           # Flensburger Beschreibungen
│  │   ├─ rodeGruetteText.md         # Text Röde Grütt
│  │   ├─ sippungsfolge.json         # Sippungsfolge
│  │   └─ windjammerText.md          # Text Windjammerorden
│  ├─ App.vue
│  ├─ main.js
│  ├─ router.js                      # Routen-Definitionen
│  └─ style.css                      # Globale Styles
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.js
```

---

## 🔧 Arbeiten mit JSON‑Daten

Die Anwendung lädt Inhalte dynamisch aus `src/data/`. Beispiele:

### `src/data/aktuelles.json`

```json
[
  {
    "id": 1,
    "text": "Aktuelle Bilder der letzten Sippung in dieser Winterung."
  }
]
```

### `src/data/dictionary.json`

```json
{
  "term": "Minnegabe",
  "definition": "Eine künstlerische Gabe, z. B. ein Gedicht, ein Lied oder ein Kunstwerk, das ein Schlaraffe einem anderen bei einem besonderen Anlass überreicht. Ausdruck von Wertschätzung und Freundschaft.",
  "kategorie": "Tradition",
  "beispiel": "Als Zeichen der Anerkennung überreichte Rt Poeta seinem Burgmeister eine selbstverfasste Minnegabe.",
  "herkunft": "Mittelhochdeutsch „minne“ (Liebe) und „Gabe“"
}
```

### `src/data/events.json`

```json
[
  {
    "id": "event3",
    "date": "2025-08-10",
    "title": "Sommerfest der Schlaraffen",
    "description": "Festliche Tafel mit Grillgut, Bier und geselligem Umtrunk im Freien.",
    "image": "sommerfest.png"
  }
]
```

### `src/data/sippungsfolge.json`

```json
[
  {
    "id": 3158,
    "date": "10.10.2024",
    "title": "Eröffnungsschlaraffiade und JMV"
  }
]
```

Weitere Dateien (`flensburgen.json`, etc.) folgen ähnlicher Struktur. Markdown‑Texte für ausführliche Beschreibungen liegen als `.md` vor.

---

## 🔍 Routenübersicht

| Route              | Komponente              |
| ------------------ | ----------------------- |
| `/`                | `HomePage.vue`          |
| `/about`           | `AboutPage.vue`         |
| `/sippungsfolge`   | `SippungsfolgePage.vue` |
| `/die-flensburgen` | `FlensburgenPage.vue`   |
| `/dictionary`      | `DictionaryPage.vue`    |
| `/contact`         | `ContactPage.vue`       |
| `/newsletter`      | `NewsletterPage.vue`    |
| `/impressum`       | `Impressum.vue`         |
| `/terms`           | `Terms.vue`             |
| `/privacy`         | `Privacy.vue`           |

---

## 👩🏻‍💻 Hinweise für Entwickler

* **Globale Styles & Variablen**: `src/style.css` enthält CSS‑Variablen für Farben, Abstände, Schatten und Radii.
* **Animationen**: Elemente mit `.animate-target` erhalten beim Mounten die Klasse `.animate-in`.
* **Responsive Design**: Mobile Navigation in `NavigationBar.vue`, Media Queries in Scoped-Styles.
* **Bild-Loading**: `import.meta.glob` lädt alle Bilder aus `src/assets/pictures`.

---

## 📈 Ausblick / To‑Do

* Backend‑Anbindung für Kontaktformular und Newsletter (Serverless/API).
* Juristische Prüfung der Rechtstexte.
* Mitgliederbereich / Passwortschutz.
* Erweiterte Event‑Galerie und Archiv.

---

© Schlaraffia Flensburgia e. V.
