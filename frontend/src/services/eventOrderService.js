import axios from 'axios';

// Configuration de l'API
const API_URL = '/api/orders/event';

// Configuration des headers avec token d'authentification
const getConfig = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

// Créer une commande événementielle
export const createEventOrder = async (orderData, token) => {
  try {
    const { data } = await axios.post(API_URL, orderData, getConfig(token));
    return data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

// Obtenir les détails d'une commande événementielle
export const getEventOrderDetails = async (id, token) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`, getConfig(token));
    return data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

// Obtenir toutes les commandes événementielles d'un utilisateur
export const getMyEventOrders = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/myorders`, getConfig(token));
    return data;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

// Mettre à jour le statut d'une commande événementielle (admin seulement)
export const updateEventOrderStatus = async (id, status, token) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/${id}/status`,
      { status },
      getConfig(token)
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

export default {
  createEventOrder,
  getEventOrderDetails,
  getMyEventOrders,
  updateEventOrderStatus,
};