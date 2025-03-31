import axios from 'axios';

const API_URL = 'https://your-api-url.com'; // Replace with your actual API URL

export const searchNames = async (query) => {
  const response = await axios.get(`${API_URL}/search/names?q=${query}`);
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${API_URL}/movies/${id}`);
  return response.data;
};

export const getActorInfo = async (id) => {
  const response = await axios.get(`${API_URL}/actors/${id}`);
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(`${API_URL}/genres`);
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await axios.post(`${API_URL}/movies`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await axios.delete(`${API_URL}/movies/${id}`);
  return response.data;
};