<template>
  <Teleport to="body">
    <div class="backdrop" @click.self="close">
      <div class="modal" role="dialog" aria-modal="true">
        <button class="close" @click="close">×</button>

        <h3>{{ item.title }}</h3>
        <p class="date">{{ item.date }}</p>

        <!-- 1) Falls wir mindestens ein Bild haben, alle anzeigen -->
        <div v-if="images && images.length" class="gallery">
          <img
            v-for="(src, idx) in images"
            :key="idx"
            :src="src"
            :alt="item.title"
            @click="openZoom(src)"
          />
        </div>

        <!-- 2) Falls kein Bild (Bsp.-Feld image), könnte man hier noch fallback implementieren -->
        <div v-else class="gallery">
          <img
            src="../assets/pictures/sippungen/placeholder.jpg"
            alt="Kein Bild verfügbar"
          />
        </div>

        <!-- Beschreibung, falls vorhanden -->
        <div class="description" v-if="item.description" v-html="item.description" />

      </div>
    </div>

    <div
      v-if="zoomSrc"
      class="zoom-backdrop"
      @click.self="closeZoom"
    >
      <img :src="zoomSrc" class="zoom-img" />
      <button class="zoom-close" @click="closeZoom">×</button>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

// Props: item und images
const props = defineProps({
  item: Object,
  images: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['close'])

function close() {
  emit('close')
}

// Zoom-Logik
const zoomSrc = ref(null)
function openZoom(src) {
  zoomSrc.value = src
}
function closeZoom() {
  zoomSrc.value = null
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  position: relative; 
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  animation: zoomIn 0.3s ease;
  color: #111;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.75rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.25rem 0;
}

.gallery img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  cursor: zoom-in;
}
.gallery img:hover {
  transform: scale(1.04);
}

.zoom-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  animation: fadeIn 0.25s ease;
}
.zoom-img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 0.75rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}
.zoom-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2rem;
  line-height: 1;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
-