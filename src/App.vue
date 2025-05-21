<template>
  <div id="app">
    <NavigationBar />
    <router-view />
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
</style>