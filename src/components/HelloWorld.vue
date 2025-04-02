<script setup>
</script>

<template>
  <div class="home-container">
    <div class="welcome-box">
      <h1>Welcome to MovieVault</h1>
      <p>Dive into our massive IMDb-powered database of films and stars.</p>
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
  padding: 20px;
  background: none; /* No background, fully transparent */
}

.welcome-box {
  background: rgba(66, 87, 78, 0.3); /* Semi-transparent green for subtle contrast */
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.welcome-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.welcome-box h1 {
  font-size: 2.8rem;
  color: #e8f0e9; /* Light grey-green */
  margin-bottom: 25px;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); /* Stronger shadow for readability */
}

.welcome-box p {
  font-size: 1.3rem;
  color: #b7c9bf; /* Softer grey-green */
  margin-bottom: 30px;
  line-height: 1.6;
  font-family: 'Arial', sans-serif;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Shadow for readability */
}

.explore-button {
  display: inline-block;
  padding: 14px 30px;
  background: #8ab89a; /* Muted green */
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #6e947e;
}

.explore-button:hover {
  background: #6e947e; /* Darker green on hover */
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  color: #e8f0e9;
}
</style>