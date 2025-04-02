<script setup>
import { useRoute } from 'vue-router'; 
const route = useRoute(); // Keep this if you plan to use route-based logic later; otherwise, it’s fine as is
</script>

<template>
  <div class="app-container">
    <nav class="movie-nav">
      <div class="logo">MovieVault</div>
      <ul>
        <li><router-link to="/" active-class="active-link">Home</router-link></li>
        <li><router-link to="/search-name" active-class="active-link">Search Actors</router-link></li>
        <li><router-link to="/search-title" active-class="active-link">Search Films</router-link></li>
        <li><router-link to="/add-name" active-class="active-link">Add Actor</router-link></li>
        <li><router-link to="/add-title" active-class="active-link">Add Film</router-link></li>
        <li><router-link to="/update-title" active-class="active-link">Update Film</router-link></li>
        <li><router-link to="/delete-title" active-class="active-link">Delete Film</router-link></li>
      </ul>
    </nav>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: none; /* Let index.html background show through */
}

.movie-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(66, 87, 78, 0.85); /* Deep green, slightly less transparent than components */
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  font-family: 'Raleway', sans-serif;
}

.movie-nav .logo {
  font-size: 2rem;
  font-weight: 700;
  color: #e8f0e9; /* Light grey-green */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.movie-nav ul {
  list-style: none;
  display: flex;
  gap: 25px;
}

.movie-nav ul li a {
  color: #e8f0e9;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.movie-nav ul li a:hover,
.movie-nav ul li a.router-link-active {
  background: #8ab89a; /* Muted green */
  border: 2px solid #6e947e; /* Darker green border */
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.content {
  padding: 100px 20px 20px; /* Extra padding to account for fixed nav */
}

/* Removed .home-container and .welcome styles since they’re in Home.vue */

/* Responsive */
@media (max-width: 600px) {
  .movie-nav {
    flex-direction: column;
    padding: 15px;
  }

  .movie-nav .logo {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .movie-nav ul {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    text-align: center;
  }

  .movie-nav ul li a {
    display: block;
    padding: 12px;
  }

  .content {
    padding: 120px 10px 10px;
  }
}
</style>