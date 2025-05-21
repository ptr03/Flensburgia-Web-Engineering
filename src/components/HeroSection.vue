<template>
  <section
    class="hero"
    :style="{ backgroundImage: `url(${heroBg})` }"
  >
    <!-- Overlays for contrast -->
    <div class="overlay top"></div>
    <div class="overlay bottom"></div>

    <div class="content-wrapper">
      <!-- Centered Main Title -->
      <h1 class="hero-title">Schlaraffia Flensburg</h1>

      <!-- Welcome Text -->
      <h2 class="welcome-text">Ein herzliches Willkommen</h2>

      <!-- Call to Action links to About page -->
      <router-link to="/about" class="cta-button">Mehr erfahren<span class="icon-arrow"></span></router-link>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import heroBg from '../assets/pictures/3.jpeg'

onMounted(() => {
  nextTick(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )
    document
      .querySelectorAll('.hero-title, .welcome-text, .cta-button')
      .forEach(el => observer.observe(el))
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  overflow: hidden;
}

/* Gradient overlays */
.overlay.top {
  position: absolute;
  inset: 0;
  background: linear-gradient(20deg, rgba(0,0,0,0.7), rgba(0,0,0,0.25));
  z-index: 1;
}
.overlay.bottom {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 25vh;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 800px;
  width: 100%;
}

/* Hidden initial state */
.hero-title,
.welcome-text,
.cta-button {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4,0,0.2,1);
}

/* Animate in */
.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.hero-title {
  color: #fff;
  font-size: clamp(2.5rem,6vw,4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  transition-delay: 0.2s;
}

.welcome-text {
  color: #fff;
  font-size: clamp(1.5rem,3vw,2.5rem);
  font-weight: 300;
  margin-bottom: 2rem;
  transition-delay: 0.4s;
}

/* CTA Button styling */
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background: rgba(255,255,255,0.15);
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.3s ease;
  transition-delay: 0.6s;
  position: relative;
  overflow: hidden;
}
.cta-button:hover {
  background: rgba(255,255,255,0.25);
}

.icon-arrow {
  width: 0.75rem;
  height: 0.75rem;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.scroll-line {
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.8), transparent);
  animation: scrollLine 2s infinite;
}
@keyframes scrollLine {
  0% { transform: translateY(-20px); opacity:0 }
  50% { opacity:1 }
  100% { transform: translateY(20px); opacity:0 }
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .hero-title { transition-delay:0.1s }
  .welcome-text { transition-delay:0.3s }
  .cta-button { transition-delay:0.5s; padding:0.5rem 1.5rem }
}
</style>
