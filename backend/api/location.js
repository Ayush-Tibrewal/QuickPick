// api/location.js
const axios = require('axios');

module.exports = async (req, res) => {
  const { pincode } = req.query;
  const encodedQuery = encodeURIComponent(`"${pincode}"`);

  const apiKey = process.env.API;
  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  const response = await axios.get(`https://geocode.maps.co/search?q=${encodedQuery}&api_key=${apiKey}`);
  const lat = Number(response.data[0]?.lat);
  const lon = Number(response.data[0]?.lon);

  res.status(200).json({ latitude: lat, longitude: lon });
};
