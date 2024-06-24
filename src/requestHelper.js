import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://localhost:3000';

// Create an instance of axios with default configurations
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all items
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Function to get an item by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a new item
export const createUser = async (itemData) => {
  try {
    const response = await api.post('/users', itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Function to update an existing item by ID
export const updateUser = async (id, itemData) => {
  try {
    const response = await api.put(`/users/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete an item by ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error);
    throw error;
  }
};
