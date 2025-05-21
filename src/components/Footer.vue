<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Flensburgia</h4>
          <p>Copyright © 2024 Website. All rights</p>
        </div>
        <div class="footer-section">
          <h4>Links</h4>
          <router-link to="/impressum">Impressum</router-link>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #333;
  color: #fff;
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
}

.footer-section {
  flex: 1;
}

.footer-section a {
  display: block;
  color: #fff;
  text-decoration: none;
  margin: 0.5rem 0;
}
</style>