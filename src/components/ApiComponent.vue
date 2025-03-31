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
  <div class="mountain-container">
    <h1 class="title">Peak Explorer</h1>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Seek a name (e.g., Tom Hanks)"
        @keypress="handleKeyPress"
      />
      <button @click="fetchData">Ascend</button>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Climbing the peaks...</p>
    </div>

    <!-- Results -->
    <div v-else-if="data && data.length > 0" class="results">
      <div v-for="item in data" :key="item.nconst" class="card">
        <h3>{{ item.primaryName }}</h3>
        <p v-if="item.birthYear || item.deathYear">
          Lifespan: {{ item.birthYear || "Unknown" }} - {{ item.deathYear || "Present" }}
        </p>
        <p v-if="item.primaryProfession">
          Legacy: {{ item.primaryProfession }}
        </p>
      </div>
    </div>

    <!-- No Results -->
    <p v-else-if="data && data.length === 0" class="no-results">
      No legends found for "{{ searchQuery }}" in the peaks.
    </p>
  </div>
</template>

<style scoped>
/* Winter Mountain Theme */
.mountain-container {
  max-width: 900px;
  margin: 80px auto 20px; /* Offset for navbar */
  padding: 40px 20px;
  background: rgba(236, 240, 241, 0.9); /* Frosted white */
  border: 4px solid #34495e; /* Dark slate */
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  position: sticky; /* Make the container sticky */
  top: 20px; /* Adjust as needed to determine the distance from the top */
  font-family: 'Raleway', sans-serif;
  color: #2c3e50; /* Dark mountain blue */
  max-height: 80vh; /* Restrict container height to 80% of viewport height */
  overflow-y: auto; /* Add vertical scrollbar when content overflows */
}



/* Title */
.title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  color: #34495e;
  text-shadow: 0 0 10px rgba(149, 165, 166, 0.7);
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
  border: 3px solid #95a5a6; /* Cool gray */
  border-radius: 10px;
  background: #fff;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-bar input:focus {
  border-color: #3498db; /* Icy blue */
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);
}

.search-bar button {
  padding: 15px 30px;
  font-size: 1.2rem;
  background: linear-gradient(45deg, #34495e, #3498db); /* Slate to blue */
  color: #e6eef5;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-bar button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Error Message */
.error {
  text-align: center;
  color: #e74c3c; /* Red for visibility */
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
  color: #34495e;
  font-size: 1.3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #95a5a6;
  border-top: 5px solid #3498db;
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
  background: #fff;
  padding: 20px;
  border: 2px solid #34495e;
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
  color: #34495e;
  font-style: italic;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 600px) {
  .mountain-container {
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