<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <h4 class="footer-title">Flensburgia</h4>
        <p class="footer-copy">© 2025 Schlaraffia Flensburgia. Alle Rechte vorbehalten.</p>
      </div>
      <div class="footer-links">
        <h4 class="footer-title">Rechtliches</h4>
        <router-link to="/impressum" class="footer-link">Impressum</router-link>
        <router-link to="/terms" class="footer-link">Terms &amp; Conditions</router-link>
        <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #ffffff;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 1.5rem 1rem;
  width: 100%;
  flex-shrink: 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-brand,
.footer-links {
  flex: 1 1 200px;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.footer-copy {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.footer-link {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .footer {
    padding: 0.5rem 0.75rem;
  }
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0 !important;
  }
  .footer-brand,
  .footer-links {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .footer-title {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  .footer-copy {
    font-size: 0.75rem;
  }
  .footer-link {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
}
</style>
