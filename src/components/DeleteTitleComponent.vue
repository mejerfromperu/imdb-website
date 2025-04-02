<script setup>
import { ref } from "vue";
import axios from "axios";

const tconst = ref(""); // Holds the movie ID to delete
const successMessage = ref("");
const error = ref(null);

const deleteTitle = async () => {
  try {
    successMessage.value = "";
    error.value = null;

    if (!tconst.value.trim()) {
      error.value = "Please enter a valid tconst ID.";
      return;
    }

    console.log("Deleting Title:", tconst.value);

    const response = await axios.delete(
      `https://localhost:7135/api/imdbRest/titles/${tconst.value.trim()}`
    );

    successMessage.value = "Title deleted successfully!";
    console.log("Title deleted:", response.data);
    tconst.value = ""; // Reset input field
  } catch (err) {
    console.error("Error in response:", err.response?.data);
    error.value =
      err.response?.data?.message || err.message || "Failed to delete Film Title";
  }
};
</script>

<template>
  <div class="delete-title-container">
    <h1 class="title">Delete a Film</h1>
    <form @submit.prevent="deleteTitle">
      <input v-model="tconst" type="text" placeholder="Enter ID To Delete Film Title (tconst)" required />
      <button type="submit">Delete Film Title</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.delete-title-container {
  max-width: 600px;
  margin: 60px auto 20px;
  padding: 30px;
  background: rgba(66, 87, 78, 0.5);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  font-family: 'Raleway', sans-serif;
  color: #e8f0e9;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.delete-title-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #e8f0e9;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

/* Form styling */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #6e947e;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #8ab89a;
  box-shadow: 0 0 10px rgba(138, 184, 154, 0.5);
}

/* Button */
button {
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  background: #e74c3c;
  color: #ffffff;
  border: 2px solid #c0392b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

/* Success & Error Messages */
.success, .error {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
}

.success {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.error {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}

/* Responsive */
@media (max-width: 600px) {
  .delete-title-container {
    max-width: 90%;
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }

  input, button {
    font-size: 1rem;
  }
}
</style>
