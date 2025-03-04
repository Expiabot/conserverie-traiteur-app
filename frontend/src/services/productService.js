import axios from 'axios';

// Configuration de l'API
const API_URL = '/api/products';

// Obtenir tous les produits
export const getProducts = async (category = '') => {
  try {
    const { data } = await axios.get(
      category ? `${API_URL}?category=${category}` : API_URL
    );
    return data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

// Obtenir un produit par ID
export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

// Obtenir les produits par catégorie
export const getProductsByCategory = async (category) => {
  try {
    const { data } = await axios.get(`${API_URL}?category=${category}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

// Rechercher des produits
export const searchProducts = async (keyword) => {
  try {
    const { data } = await axios.get(`${API_URL}/search?keyword=${keyword}`);
    return data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

export default {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
};