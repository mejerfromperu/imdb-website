<script setup>
import { ref } from "vue";
import axios from "axios";

const newTitle = ref({
  tconst: "",
  primaryTitle: "",
  originalTitle: null,
  titleType: null,
  isAdult: false,
  startYear: null,
  endYear: null,
  runtimeMinutes: null,
  genres: "",
});

const successMessage = ref("");
const error = ref(null);

// Function to submit new title
const submitTitle = async () => {
  try {
    successMessage.value = "";
    error.value = null;

    // Convert genres string to an array of numbers
    const parsedGenres =
      newTitle.value.genres.trim() !== ""
        ? newTitle.value.genres.split(",").map((g) => parseInt(g.trim(), 10))
        : []; // Empty array if no genres provided

    // Construct the payload
    const titleData = {
      tconst: newTitle.value.tconst.trim(),
      primaryTitle: newTitle.value.primaryTitle.trim(),
      titleType: newTitle.value.titleType !== null ? Number(newTitle.value.titleType) : 0, // Default to 0 like Swagger
      titleTypeName: "string", // Match Swagger for now; can change to null or omit
      originalTitle: newTitle.value.originalTitle?.trim() || "string", // Default to "string" like Swagger if not provided
      isAdult: Boolean(newTitle.value.isAdult),
      startYear: newTitle.value.startYear !== null ? Number(newTitle.value.startYear) : 0, // Default to 0
      endYear: newTitle.value.endYear !== null ? Number(newTitle.value.endYear) : 0, // Default to 0
      runtimeMinutes: newTitle.value.runtimeMinutes !== null ? Number(newTitle.value.runtimeMinutes) : 0, // Default to 0
      genres: parsedGenres,
    };

    console.log("Submitting Data:", JSON.stringify(titleData, null, 2));

    const response = await axios.post(
      "https://localhost:7135/api/imdbRest/titles",
      titleData,
      { headers: { "Content-Type": "application/json" } }
    );

    successMessage.value = "Title added successfully!";
    console.log("Title added:", response.data);

    // Reset form
    newTitle.value = {
      tconst: "",
      primaryTitle: "",
      originalTitle: null,
      titleType: null,
      isAdult: false,
      startYear: null,
      endYear: null,
      runtimeMinutes: null,
      genres: "",
    };
  } catch (err) {
    console.error("Raw error response:", err.response?.data);
    error.value = err.response?.data?.errors
      ? Object.values(err.response.data.errors).flat().join(", ")
      : err.response?.data?.message || err.message || "Failed to add title";
  }
};
</script>

<template>
  <div class="add-title-container">
    <h2>Add a New Film</h2>
    <form @submit.prevent="submitTitle">
      <input v-model="newTitle.tconst" type="text" placeholder="Unique ID (tconst)" required />
      <input v-model="newTitle.primaryTitle" type="text" placeholder="Primary Title" required />
      <input v-model="newTitle.originalTitle" type="text" placeholder="Original Title (Optional)" />
      <input v-model="newTitle.titleType" type="number" placeholder="Title Type (Optional, e.g., 0 for movie)" />
      <input v-model="newTitle.startYear" type="number" placeholder="Start Year (Optional)" />
      <input v-model="newTitle.endYear" type="number" placeholder="End Year (Optional)" />
      <input v-model="newTitle.runtimeMinutes" type="number" placeholder="Runtime in Minutes (Optional)" />
      <input v-model="newTitle.genres" type="text" placeholder="Genres (comma-separated IDs, e.g., 1,2, optional)" />
      <label>
        <input v-model="newTitle.isAdult" type="checkbox" />
        Adult Content
      </label>
      <button type="submit">Add Title</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.add-title-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #eef2f3;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input, button {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1rem;
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}

.success {
  color: green;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}
</style>