<template>
  <div class="schlaraffia-time">
    <span class="label">Schlaraffen-Zeit</span>
    <div class="datetime-row">
      <span class="date">{{ schlaraffiaDate }}</span>
      <span class="separator">|</span>
      <span class="time">{{ clock }}</span>
      <Info class="info-icon" @click="toggleInfo" />
    </div>
    <div v-if="showInfo" class="info-popup">
      <p>
        Die Schlaraffen-Zeit zeigt Datum und Uhrzeit nach unserem Kalender<br/>
        (Jahr 1 = 1859). Jeder Tag beginnt um Mitternacht GMT+1.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Info } from 'lucide-vue-next'

const now = ref(new Date())
const showInfo = ref(false)
let timer

onMounted(() => {
  timer = setInterval(() => (now.value = new Date()), 1000)
})
onUnmounted(() => clearInterval(timer))

function toggleInfo() {
  showInfo.value = !showInfo.value
}

const clock = computed(() => {
  const d = now.value
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
})

const schlaraffiaDate = computed(() => {
  const d = now.value
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = d.getFullYear() - 1858
  return `${dd}.${mm}.${yy}`
})
</script>

<style scoped>
.schlaraffia-time {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0em;                             
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  padding: 0.8em 1.4em;                
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #1d1d1f;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.label {
  font-weight: 600;
  color: #0369a1;
  margin-right: 0.2em;                 
}

.datetime-row {
  display: flex;
  align-items: center;
  gap: 0.2em;                           
}

.separator {
  color: #0a86c0;
}

.date, .time {
  padding: 0.2em 0.5em;
  border-radius: 4px;
  background: rgba(14,165,233,0.2);
  font-weight: 600;
}

.time {
  font-weight: 600;
}

.info-icon {
  width: 1em;
  height: 1em;
  color: #0ea5e9;
  cursor: pointer;
  margin-left: 0.2em;
}

.info-popup {
  position: absolute;
  top: 140%;
  right: 0;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  color: #1d1d1f;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 280px;
  font-size: 0.85rem;
  line-height: 1.4;
  z-index: 2000;
}
.info-popup p { margin: 0; }

/* Mobile adjustments */
@media (max-width: 768px) {
  .schlaraffia-time {
    flex-direction: column;
    align-items: center;                
    padding: 0.6em 1.2em;
    min-width: 140px;
    font-size: 0.8rem;
    position: fixed !important;
    top: 0.8rem;
    right: 0.8rem;
    z-index: 2000;
  }
  .label {
    margin-right: 0;                     
  }
  .datetime-row {
    margin-top: 0.3em;
  }
}
</style>
