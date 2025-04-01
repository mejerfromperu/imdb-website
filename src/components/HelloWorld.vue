<script setup>
</script>

<template>
  <div class="home-container">
    <div class="welcome-box">
      <h1>Welcome to Winter Peaks</h1>
      <p>Explore the icy heights and uncover legends in the snow.</p>
      <router-link to="/search-name" class="explore-button">Start Exploring</router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
}

.welcome-box {
  background: rgba(44, 62, 80, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.welcome-box h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 0 0 15px rgba(149, 165, 166, 0.7);
}

.welcome-box p {
  font-size: 1.4rem;
  color: #bdc3c7;
  margin-bottom: 20px;
}

.explore-button {
  display: inline-block;
  padding: 12px 25px;
  background: #3498db;
  color: white;
  font-size: 1.2rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease;
}

.explore-button:hover {
  background: #2980b9;
  transform: translateY(-3px);
}
</style>
