<script setup>
import { ref } from "vue";
import axios from "axios";

const searchQuery = ref(""); // Store the user's search input
const data = ref(null); // Store the API response
const error = ref(null); // Store any errors
const isLoading = ref(false); // Track loading state

const fetchData = async () => {
  if (!searchQuery.value.trim()) {
    error.value = "Please enter a search term";
    return;
  }

  isLoading.value = true;
  error.value = null;
  data.value = null;

  try {
    const response = await axios.get(
      `https://localhost:7135/api/imdbRest/titles/search?query=${searchQuery.value}`
    );
    console.log("API Response:", response.data); // Debugging line
    data.value = response.data.items || [];
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = err.message || "Failed to fetch data";
  } finally {
    isLoading.value = false;
  }
};

// Allow searching by pressing Enter
const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    fetchData();
  }
};
</script>

<template>
  <div class="search-container">
    <h1 class="title">Search for famous Films</h1>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Seek a film (e.g., Titanic)"
        @keypress="handleKeyPress"
      />
      <button @click="fetchData">Search</button>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Results -->
    <div v-else-if="data && data.length > 0" class="results">
      <div v-for="item in data" :key="item.tconst" class="card">
        <h3>{{ item.primaryTitle || "Unknown Title" }}</h3>
        <p v-if="item.originalTitle && item.originalTitle !== item.primaryTitle">
          Original Title: {{ item.originalTitle }}
        </p>
        <p v-if="item.titleTypeName">
          Type: {{ item.titleTypeName }}
        </p>
        <p v-if="item.startYear">
          Released: {{ item.startYear }} <span v-if="item.endYear">- {{ item.endYear }}</span>
        </p>
        <p v-if="item.runtimeMinutes">
          Duration: {{ item.runtimeMinutes }} minutes
        </p>
        <p v-if="item.genres && item.genres.length > 0">
          Genres: {{ item.genres.join(", ") }}
        </p>
        <p v-if="item.isAdult">
          ! **Adult Content**
        </p>
      </div>
    </div>

    <!-- No Results -->
    <p v-else-if="data && data.length === 0" class="no-results">
      No films found for "{{ searchQuery }}".
    </p>
  </div>
</template>

<style scoped>
.search-container {
  max-width: 900px;
  margin: 80px auto 20px;
  padding: 40px;
  background: rgba(66, 87, 78, 0.5); /* Slightly less transparent green */
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  font-family: 'Raleway', sans-serif;
  color: #e8f0e9; /* Light grey-green for text */
  max-height: 80vh;
  overflow-y: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

/* Title */
.title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  color: #e8f0e9;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
}

/* Search Bar */
.search-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-bar input {
  width: 100%;
  max-width: 500px;
  padding: 15px 25px;
  font-size: 1.2rem;
  border: 2px solid #6e947e;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-bar input:focus {
  border-color: #8ab89a;
  box-shadow: 0 0 15px rgba(138, 184, 154, 0.5);
}

.search-bar button {
  padding: 15px 30px;
  font-size: 1.2rem;
  background: #8ab89a; /* Muted green */
  color: #ffffff;
  border: 2px solid #6e947e;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-bar button:hover {
  background: #6e947e; /* Darker green */
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Error Message */
.error {
  text-align: center;
  color: #e74c3c;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 15px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  margin-bottom: 20px;
}

/* Loading Spinner */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #e8f0e9;
  font-size: 1.3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #b7c9bf;
  border-top: 5px solid #8ab89a;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Results */
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.card {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border: 2px solid #6e947e;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.card h3 {
  margin: 0 0 10px;
  font-size: 1.4rem;
  color: #34495e;
}

.card p {
  margin: 5px 0;
  color: #7f8c8d;
}

/* No Results */
.no-results {
  text-align: center;
  font-size: 1.3rem;
  color: #e8f0e9;
  font-style: italic;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 600px) {
  .search-container {
    margin: 60px auto 10px;
    padding: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .search-bar {
    flex-direction: column;
    gap: 15px;
  }

  .search-bar input,
  .search-bar button {
    max-width: 100%;
  }
}
</style>