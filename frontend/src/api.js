import axios from 'axios';

// Replace with your actual deployed URL
const BASE_URL = 'https://quickpick-backend-production.up.railway.app'; // Must include "https://"

export const fetchComparison = async (query, pincode) => {
  const res = await axios.post(`${BASE_URL}/search/compare`, { query, pincode });
  return res.data;
};