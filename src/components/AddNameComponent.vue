<script setup>
import { ref } from "vue";
import axios from "axios";
// husk npm install før det virker til nye projekter

const newName = ref({
  nconst: "",
  primaryName: "",
  birthYear: null,
  deathYear: null,
  primaryProfession: "",
});

const successMessage = ref("");
const error = ref(null);

// funcccccccccccccccc
const submitName = async () => {
  try {
    successMessage.value = "";
    error.value = null;


    // super trist construct af dataen jeg sender, næste gang FIND ET ALTERNATIV 

    const newName = {
      nconst: newName.value.nconst.trim(),

      primaryName: newName.value.primaryName.trim(),

      birthYear: newName.value.birthYear !== null ? Number(newTitle.value.birthYear) : 0,
      deathYear: newName.value.deathYear !== null ? Number(newTitle.value.deathYear) : 0,

      primaryProfession: newName.value.primaryProfession?.trim() || "string",
    
    };

    console.log("Submitting Data:", JSON.stringify(nameData, null, 2));

    const response = await axios.post(
      "https://localhost:7135/api/imdbRest/names",
      nameData,
      // refac
    );

    successMessage.value = "NAME ADDED successfully!";
    console.log("name added:", response.data);

    newName.value = {
      nconst: "",
      primaryName: "",
      birthYear: null,
      deathYear: null,
      primaryProfession: false,
    };
  } catch (err) {
    console.error("error in response:", err.response?.data);
    const errData = err.response?.data;
    error.value = errData?.errors 
        ? Object.values(errData.errors).flat().join(", ") 
        : errData?.message || err.message || "Failed to add name/actor";
  } 
};
</script>

<template>
  <div class="add-title-container">
    <h1 class="title">Add a New actor</h1>
    <form @submit.prevent="submitName">
      
      <input v-model="newName.nconst" type="text" placeholder="Unique ID (nconst )" required />
      <input v-model="newName.primaryName" type="text" placeholder="Primary Name" required />
      <input v-model="newName.birthYear" type="number" placeholder="Birth Year (Optional)" />
      <input v-model="newName.deathYear" type="number" placeholder="Death Year (Optional)" />
      <input v-model="newName.primaryProfession" type="text" placeholder="Primary Profession (comma-separated pls, e.g., actor, writer, optional)" />


      <button type="submit">Add Name </button>
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
