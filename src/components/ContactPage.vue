<template>
  <section class="contact-section">
    <div class="contact-container">
      <h2 class="section-title">Get in Touch</h2>
      
      <div class="contact-grid">
        <!-- Contact Form -->
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <input
              v-model="formData.name"
              type="text"
              id="name"
              required
              class="form-input"
              placeholder=" "
            />
            <label for="name" class="form-label">Full Name</label>
          </div>

          <div class="form-group">
            <input
              v-model="formData.email"
              type="email"
              id="email"
              required
              class="form-input"
              placeholder=" "
            />
            <label for="email" class="form-label">Email Address</label>
          </div>

          <div class="form-group">
            <textarea
              v-model="formData.message"
              id="message"
              required
              class="form-input textarea"
              placeholder=" "
              rows="5"
            ></textarea>
            <label for="message" class="form-label">Your Message</label>
          </div>

          <button type="submit" class="submit-button" :disabled="isLoading">
            <span v-if="!isLoading">Send Message</span>
            <div v-else class="loading-spinner"></div>
          </button>
        </form>

        <!-- Map & Social -->
        <div class="contact-info">
          <div class="map-container">
            <div class="map-placeholder">
              <p>Map Integration Placeholder</p>
            </div>
          </div>

          <div class="social-links">
            <a href="#" class="social-link">
              <Facebook class="social-icon" />
              <span>Facebook</span>
            </a>
            <a href="#" class="social-link">
              <Instagram class="social-icon" />
              <span>Instagram</span>
            </a>
            <a href="#" class="social-link">
              <Twitter class="social-icon" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Facebook, Instagram, Twitter } from 'lucide-vue-next';

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const isLoading = ref(false);

const submitForm = () => {
  isLoading.value = true;
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false;
    formData.value = { name: '', email: '', message: '' };
  }, 2000);
};
</script>

<style scoped>
.contact-section {
  padding: 4rem clamp(1rem, 5vw, 4rem);
  background: #fbfbfd;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 500;
  color: #1d1d1f;
}

.contact-grid {
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  position: relative;
  margin-bottom: 2rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: transparent;
}

.form-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 4px rgba(0, 103, 204, 0.1);
}

.form-label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #86868b;
  pointer-events: none;
  transition: all 0.3s ease;
  background: #fbfbfd;
  padding: 0 0.5rem;
}

.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.875rem;
  color: #0066cc;
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  background: #0066cc;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button:hover {
  background: #004499;
}

.submit-button:disabled {
  background: #d2d2d7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.map-placeholder {
  background: #e8e8ed;
  border-radius: 12px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #86868b;
}

.social-links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1d1d1f;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.75rem;
  border-radius: 8px;
}

.social-link:hover {
  background: rgba(0, 102, 204, 0.05);
  color: #0066cc;
}

.social-icon {
  width: 24px;
  height: 24px;
}
</style>