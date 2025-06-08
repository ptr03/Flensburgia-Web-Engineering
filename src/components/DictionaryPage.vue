<template>
  <!-- Container für die Wörterbuch-Seite (Dictionary Page Container) -->
  <div class="dictionary-page-container">
    <!-- Einbinden der DictionarySection-Komponente -->
    <DictionarySection />
  </div>
</template>

<script setup>
// Import der DictionarySection-Komponente
import DictionarySection from './DictionarySection.vue'
</script>

<style scoped>
/* Haupt-Container der Dictionary-Seite (Dictionary Page Styling) */
.dictionary-page-container {
  min-height: 100vh;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}
</style>
