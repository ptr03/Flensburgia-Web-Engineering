<!-- src/App.vue -->
<template>
  <div id="app">
    <NavigationBar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    NavigationBar,
    Footer
  }
}
</script>

<style>
@import './style.css';

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
