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
      `https://localhost:7135/api/imdbRest/names/search?query=${searchQuery.value}`
    );
    console.log("Response:", response.data);
    console.log("Is response.data an array?", Array.isArray(response.data));
    // Extract the items array from response.data
    data.value = response.data.items || [];
    console.log("data.value after assignment:", data.value);
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
  <div class="container">
    <h1 class="title">Search for Names</h1>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Enter a name (e.g., Tom Hanks)"
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
      <div v-for="item in data" :key="item.nconst" class="card">
        <h3>{{ item.primaryName }}</h3>
        <p v-if="item.birthYear || item.deathYear">
          Lifetime: {{ item.birthYear || "Unknown" }} - {{ item.deathYear || "Present" }}
        </p>
        <p v-if="item.primaryProfession">
          Profession: {{ item.primaryProfession }}
        </p>
      </div>
    </div>

    <!-- No Results -->
    <p v-else-if="data && data.length === 0" class="no-results">
      No results found for "{{ searchQuery }}".
    </p>
  </div>
</template>

<style scoped>
/* General Styles */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.title {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

/* Search Bar Styles */
.search-bar {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #dfe6e9;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: #00b4b4;
}

.search-bar button {
  padding: 12px 25px;
  font-size: 1rem;
  background-color: #00b4b4;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #009a9a;
}

/* Error Message */
.error {
  text-align: center;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Loading Spinner */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #7f8c8d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #dfe6e9;
  border-top: 4px solid #00b4b4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Results */
.results {
  display: grid;
  gap: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card h3 {
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 1.25rem;
}

.card p {
  margin: 5px 0;
  color: #7f8c8d;
}

/* No Results */
.no-results {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }

  .search-bar {
    flex-direction: column;
    align-items: center;
  }

  .search-bar input,
  .search-bar button {
    width: 100%;
    max-width: 300px;
  }
}
</style>