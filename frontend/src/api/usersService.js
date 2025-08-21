import axios from "axios";

const API_URL = "http://localhost:8080/api/users"; // ton backend Spring Boot

// Récupérer tous les utilisateurs
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Créer un utilisateur
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

// Mettre à jour un utilisateur
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
