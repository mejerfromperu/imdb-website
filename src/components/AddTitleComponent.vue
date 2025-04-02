<script setup>
import { ref } from "vue";
import axios from "axios";
// husk npm install før det virker til nye projekter

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

// funcccccccccccccccc
const submitTitle = async () => {
  try {
    successMessage.value = "";
    error.value = null;

    // trimmed, splt, parsed


    const parsedGenres =
      newTitle.value.genres.trim() !== ""
        ? newTitle.value.genres.split(",").map((g) => parseInt(g.trim(), 10))
        : []; 

    // super trist construct af dataen jeg sender, næste gang FIND ET ALTERNATIV 

    const titleData = {
      tconst: newTitle.value.tconst.trim(),

      primaryTitle: newTitle.value.primaryTitle.trim(),

      titleType: newTitle.value.titleType !== null ? Number(newTitle.value.titleType) : 0,

      titleTypeName: "string", // swagger

      originalTitle: newTitle.value.originalTitle?.trim() || "string",
      
      isAdult: Boolean(newTitle.value.isAdult),

      startYear: newTitle.value.startYear !== null ? Number(newTitle.value.startYear) : 0, 

      endYear: newTitle.value.endYear !== null ? Number(newTitle.value.endYear) : 0, 

      runtimeMinutes: newTitle.value.runtimeMinutes !== null ? Number(newTitle.value.runtimeMinutes) : 0, 

      genres: parsedGenres,
    };

    console.log("Submitting Data:", JSON.stringify(titleData, null, 2));

    const response = await axios.post(
      "https://localhost:7135/api/imdbRest/titles",
      titleData,
      // refac
    );

    successMessage.value = "Title added successfully!";
    console.log("Title added:", response.data);

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
    console.error("error in response:", err.response?.data);
    const errData = err.response?.data;
    error.value = errData?.errors 
        ? Object.values(errData.errors).flat().join(", ") 
        : errData?.message || err.message || "Failed to add title";
  } 
};
</script>

<template>
  <div class="add-title-container">
    <h1 class="title">Add a New Film</h1>
    <form @submit.prevent="submitTitle">
      
      <input v-model="newTitle.tconst" type="text" placeholder="Unique ID (tconst )" required />
      <input v-model="newTitle.primaryTitle" type="text" placeholder="Primary Title" required />
      <input v-model="newTitle.originalTitle" type="text" placeholder="Original Title (Optional)" />
      <input v-model="newTitle.titleType" type="number" placeholder="Title Type (Optional, e.g., 0 for movie)" />
      <input v-model="newTitle.startYear" type="number" placeholder="Start Year (Optional)" />
      <input v-model="newTitle.endYear" type="number" placeholder="End Year (Optional)" />
      <input v-model="newTitle.runtimeMinutes" type="number" placeholder="Runtime in Minutes (Optional)" />
      <input v-model="newTitle.genres" type="text" placeholder="Genres (comma-separated IDs, e.g., 1,2, optional)" />
      <label class="checkbox-container">
        <input  v-model="newTitle.isAdult" type="checkbox" />
        ⚠️ Adult Content: IF yes check pls
      </label>

      <button type="submit">Add Title </button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.add-title-container {
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

.add-title-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

h2 {
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

/* Styled Checkbox */
.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.1rem;
  color: #e8f0e9;
  cursor: pointer;
}

.checkbox-container input {
  width: 20px;
  height: 20px;
  accent-color: #8ab89a;
  cursor: pointer;
}

/* Button */
button {
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  background: #8ab89a;
  color: #ffffff;
  border: 2px solid #6e947e;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #6e947e;
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
  .add-title-container {
    max-width: 90%;
    padding: 20px;
  }

  h2 {
    font-size: 1.8rem;
  }

  input, button {
    font-size: 1rem;
  }

  .checkbox-container {
    font-size: 1rem;
  }
}
</style>
