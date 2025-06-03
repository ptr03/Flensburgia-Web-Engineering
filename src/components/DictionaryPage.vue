<!-- src/components/DictionaryPage.vue -->
<template>
  <div class="dictionary-page-container">
    <!-- Hier wird einfach das große DictionarySection‐Component gerendert -->
    <DictionarySection />
  </div>
</template>

<script setup>
import DictionarySection from './DictionarySection.vue'
</script>

<style scoped>
.dictionary-page-container {
  /* Wenn Du willst, dass diese Komponente den vollen Viewport einnimmt: */
  min-height: 100vh;
  background-color: #FFFFFF; /* Ganz weiß hintenrum */
  display: flex;
  align-items: center;
  justify-content: center;
  /* Vertical padding, damit es nicht direkt an der Navbar klebt */
  padding: 2rem 0;
}
</style>
