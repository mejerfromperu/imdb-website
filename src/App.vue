<script setup>
// No need to import ApiComponent here; the router will handle it
import { useRoute } from 'vue-router'; // To check the current route

const route = useRoute(); // Access the current route
</script>

<template>
  <div class="app-container">
    <nav class="mountain-nav">
      <div class="logo">Winter Peaks</div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/search">Name Search</router-link></li>
      </ul>
    </nav>

    <!-- Home content when on '/' -->
    <div v-if="route.path === '/'" class="home-container">
      <div class="welcome">
        <h1>Welcome to the Winter Peaks</h1>
        <p>Explore the icy heights and uncover legends in the snow.</p>
      </div>
    </div>

    <!-- Router view for other routes like '/search' -->
    <router-view v-else></router-view>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.mountain-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(44, 62, 80, 0.9);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.mountain-nav .logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #e6eef5;
  text-shadow: 0 0 10px rgba(149, 165, 166, 0.7);
}

.mountain-nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.mountain-nav ul li a {
  color: #e6eef5;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 10px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.mountain-nav ul li a:hover,
.mountain-nav ul li a.router-link-active {
  background: #3498db;
  transform: translateY(-3px);
}

.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px 20px;
}

.welcome {
  background: rgba(44, 62, 80, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.welcome h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 0 0 15px rgba(149, 165, 166, 0.7);
}

.welcome p {
  font-size: 1.4rem;
  color: #bdc3c7;
}

@media (max-width: 600px) {
  .mountain-nav {
    flex-direction: column;
    padding: 10px;
  }

  .mountain-nav ul {
    margin-top: 10px;
    gap: 10px;
  }

  .welcome h1 {
    font-size: 2rem;
  }

  .welcome p {
    font-size: 1.2rem;
  }
}
</style>