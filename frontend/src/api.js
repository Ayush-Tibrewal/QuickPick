import axios from 'axios';

const BASE_URL = 'https://quick-pick-ayushtibrewals-projects.vercel.app';

export const fetchComparison = async (query, pincode) => {
    const res = await axios.post(`${BASE_URL}/search/compare`, { query, pincode });
    return res.data;
};
