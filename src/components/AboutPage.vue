<template>
  <section class="about-page">
    <!-- Banner -->
    <div class="about-banner" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="banner-overlay"></div>
      <h1 class="banner-title">Über Uns</h1>
    </div>

    <!-- Intro Two-Column -->
    <div class="container intro-section">
      <div class="intro-text animate-on-scroll">
        <p>
          Die Schlaraffia Flensburgia ist Teil der weltweiten Vereinigung Schlaraffia® – einer Gemeinschaft
          zur Pflege von Freundschaft, Kunst und Humor. Unsere Burg dient als kultureller Treffpunkt,
          an dem wir Tradition und Moderne verbinden.
        </p>
      </div>
      <div class="intro-image animate-on-scroll">
        <img :src="crestImg" alt="Flensburgia Wappen" />
      </div>
    </div>

    <!-- Timeline -->
    <section class="container timeline-section">
      <h2 class="section-title text-center animate-on-scroll">Unsere Geschichte</h2>
      <div class="timeline">
        <div
          v-for="(item, idx) in timeline"
          :key="idx"
          class="timeline-item animate-on-scroll"
          :style="{ 'transition-delay': `${idx * 0.2}s` }"
        >
          <div class="marker"></div>
          <div class="content">
            <h3>{{ item.year }}</h3>
            <p>{{ item.description }}</p>
            <img v-if="item.img" :src="item.img" :alt="`Event ${item.year}`" />
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="container gallery-section">
      <h2 class="section-title text-center animate-on-scroll">Bildergalerie</h2>
      <div class="gallery-grid">
        <div
          v-for="(img, idx) in galleryImgs"
          :key="idx"
          class="gallery-item animate-on-scroll"
          @click="openModal(idx)"
        >
          <img :src="img" :alt="`Gallery ${idx+1}`" />
        </div>
      </div>
      <!-- Image Modal -->
      <div v-if="modalOpen" class="modal-overlay" @click="closeModal">
        <img class="modal-img" :src="galleryImgs[modalIndex]" />
      </div>
    </section>

    <!-- Members -->
    <section class="container members-section">
      <h2 class="section-title text-center animate-on-scroll">Sassen</h2>
      <div class="members-grid">
        <div
          v-for="(m, idx) in members"
          :key="idx"
          class="member-card animate-on-scroll"
          :style="{ 'transition-delay': `${idx * 0.2}s` }"
        >
          <div class="avatar"></div>
          <p class="member-name">{{ m.name }}</p>
          <button class="info-btn" @click="selectMember(idx)">Info</button>
        </div>
      </div>
      <!-- Member Modal -->
      <div v-if="memberModalOpen" class="modal-overlay" @click="closeMemberModal">
        <div class="member-modal" @click.stop>
          <h3>{{ currentMember.name }}</h3>
          <p>{{ currentMember.details }}</p>
          <button class="close-btn" @click="closeMemberModal">Schließen</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// image imports
import bannerImg from '../assets/pictures/1.jpeg'
import crestImg from '../assets/pictures/1.jpeg'
import img2 from '../assets/pictures/2.jpeg'
import img3 from '../assets/pictures/3.jpeg'
import img4 from '../assets/pictures/4.jpeg'

// intro gallery
const galleryImgs = ref([crestImg, img2, img3, img4])
const modalOpen = ref(false)
const modalIndex = ref(0)
function openModal(i) { modalIndex.value = i; modalOpen.value = true }
function closeModal() { modalOpen.value = false }

// timeline data
const timeline = ref([
  { year: '1973', description: 'Gründung der Schlaraffia Flensburgia', img: bannerImg },
  { year: '1985', description: 'Erste große Ritterfestspiele', img: img2 },
  { year: '2001', description: 'Einweihung des neuen Burgsaals', img: img3 },
  { year: '2020', description: 'Digitalisierung der Sippungen', img: img4 }
])

// members
const members = ref([
  { name: 'Rt Haralciola', details: 'Langjähriges Mitglied und Schatzmeister.' },
  { name: 'Rt Fürst Kinken', details: 'Organisiert unsere Feste und Rituale.' },
  { name: 'Rt Lupus Gallicus', details: 'Kümmert sich um die Öffentlichkeitsarbeit.' }
])
const memberModalOpen = ref(false)
const currentMember = ref({})
function selectMember(i) {
  currentMember.value = members.value[i]
  memberModalOpen.value = true
}
function closeMemberModal() { memberModalOpen.value = false }

// scroll to top and animations
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'auto' })
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('animate-in')
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
})
</script>

<style scoped>
/* Layout */
.about-page { background: #fff; }
.about-banner {
  position: relative;
  height: 60vh;
  background-size: cover;
  background-position: center;
}
.banner-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}
.banner-title {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: clamp(2rem,5vw,4rem);
  z-index: 2;
}

.container { max-width: 1200px; margin: 0 auto; padding: 2rem; }

.intro-section { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
.intro-text p { font-size: 1.125rem; line-height: 1.6; color: #1f2937; }
.intro-image img { width: 100%; border-radius: 12px; }

/* Timeline */
.timeline-section { margin-top: 4rem; }
.timeline { position: relative; margin: 2rem 0; }
.timeline::before { content: ''; position: absolute; left: 20px; top: 0; bottom: 0; width: 4px; background: #2563eb; }
.timeline-item { display: flex; gap: 2rem; margin-bottom: 3rem; opacity: 0; transform: translateX(-20px); transition: all 0.6s ease; }
.timeline-item.animate-in { opacity:1; transform: translateX(0); }
.marker { width: 16px; height: 16px; background: #2563eb; border-radius: 50%; flex-shrink:0; margin-top:4px; }
.content h3 { margin:0 0 0.5rem; font-size:1.25rem; color:#111827; }
.content p { margin:0 0 1rem; color:#4b5563; }
.content img { width:200px; border-radius:8px; }

/* Gallery */
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap:1rem; }
.gallery-item { cursor: pointer; overflow:hidden; border-radius:8px; }
.gallery-item img { width:100%; display:block; transform: scale(1.05); transition:transform 0.3s ease; }
.gallery-item:hover img { transform: scale(1); }
.modal-overlay { position: fixed; inset:0; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:1000; }
.modal-img { max-width:90%; max-height:90%; border-radius:8px; }

/* Members */
.members-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap:2rem; }
.member-card { background:#f9fafb; padding:1.5rem; text-align:center; border-radius:12px; opacity:0; transform:translateY(20px); transition:all 0.5s ease; }
.member-card.animate-in { opacity:1; transform:translateY(0); }
.avatar { width:80px; height:80px; background:#e5e7eb; border-radius:50%; margin:0 auto 1rem; }
.member-name { font-weight:600; margin-bottom:0.5rem; color:#1f2937; }
.info-btn { background:none; border:1px solid #2563eb; color:#2563eb; padding:0.5rem 1rem; border-radius:9999px; cursor:pointer; }

/* Member Modal */
.member-modal { background:#fff; padding:2rem; border-radius:8px; max-width:400px; width:90%; box-shadow:0 4px 16px rgba(0,0,0,0.2); }
.member-modal h3 { color: #111827; margin-bottom: 0.5rem; }
.member-modal p { color: #1f2937; line-height: 1.6; }
.close-btn { margin-top:1rem; background:#2563eb; color:#fff; border:none; padding:0.5rem 1rem; border-radius:9999px; cursor:pointer; }

/* Scroll Animations */
.animate-on-scroll { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
.animate-in { opacity: 1 !important; transform: translateY(0) !important; }

/* Responsive */
@media (max-width:768px) { .intro-section { grid-template-columns:1fr; } .intro-image img { width:100%; margin-top:1rem; } }
</style>
