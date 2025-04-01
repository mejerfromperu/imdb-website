    <template>
    <div class="container">
      <h2>Search for a Name</h2>
      <input v-model="searchQuery" placeholder="Enter name..." />
      <button @click="searchName">Search</button>
  
      <div v-if="results.length > 0">
        <h3>Results:</h3>
        <ul>
          <li v-for="name in results" :key="name.nconst">{{ name.primaryName }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  
  const searchQuery = ref("");
  const results = ref([]);
  
  const searchName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/imdbRest/names/search?query=${searchQuery.value}`
      );
      results.value = response.data;
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  input {
    padding: 10px;
    margin-right: 10px;
  }
  button {
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  