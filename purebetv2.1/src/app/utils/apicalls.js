// api.js
import axios from 'axios';

const BASE_URL = 'http://15.222.64.232/v2';

export const getActiveLeagues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/leagues`);
    return response.data;
  } catch (error) {
    console.error('Error fetching active leagues:', error);
    throw error;
  }
};

export const getHighlights = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/highlights`);
    return response.data;
  } catch (error) {
    console.error('Error fetching highlights:', error);
    throw error;
  }
};

export const search = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error performing search:', error);
    throw error;
  }
};

export const getNextEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events/next`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching next events:', error);
    throw error;
  }
};

export const getEvents = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/events`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getLiveEvents = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/live`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching live events:', error);
    throw error;
  }
};

export const getMarketData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/market`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

export const getSportEvents = async (sportId) => {
  try {
    const response = await axios.get(`${BASE_URL}/events`, { params: { sport: sportId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching sport events:', error);
    throw error;
  }
};
