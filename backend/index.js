const express = require('express');
const cors = require('cors');
const matchProducts = require('./utils/compareProducts');
const scrapeBlinkit = require('./scrapers/blinkit'); 
const fetchZeptoPrices = require('./scrapers/zepto');
const swiggyScrape= require('./scrapers/instamart');
const fetchLocation=require('./api')

const app = express();
app.use(cors());  
app.use(express.json());

app.post('/search/swiggy',async(req,res)=>{
  const {query,pincode}=req.body;
  const location=await fetchLocation(pincode)

  if (!query || !pincode) {
    return res.status(400).json({ error: 'Query and pincode required.' });
  }
  if(!location.latitude){
    return res.status(400).json({error:"Try searching with a more specific locality name "})
  }
  try {
    const results = await swiggyScrape(query, location);
    res.json(results);
  } catch (error) {
    console.error('Error scraping Swiggy:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})

app.post('/search/blinkit', async (req, res) => {
  const { query, pincode } = req.body;
  if (!query || !pincode) {
    return res.status(400).json({ error: 'Query and pincode required.' });
  }

  try {
    const results = await scrapeBlinkit(query, pincode);
    res.json(results);
  } catch (error) {
    console.error('Error scraping Blinkit:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// app.post('/search/zepto', async (req, res) => {
//   const { query, pincode } = req.body;
//   const location=await fetchLocation(pincode);
//   if (!query || !pincode) {
//     return res.status(400).json({ error: 'Query and pincode required.' });
//   }
//   if(!location.latitude){
//     return res.status(400).json({error:"Try searching with a more specific locality name "})
//   }
//   const results = await fetchZeptoPrices(query, location);
//   res.json(results);
// });
app.post("/search/zepto", async (req, res) => {
  const { query , pincode} = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query required." });
  }

  try {
    console.log("🔍  Zepto search:", { query, pincode });
    const results = await fetchZeptoPrices(query, pincode);
    console.log("✅  Zepto returned", results.length, "products");
    res.json(results);

  } catch (err) {
    // <— this will print the real underlying error
    console.error("💥 Zepto scrape threw:", err);
    res.status(500).json({ error: "Failed to fetch Zepto data.", details: err.message });
  }
});






app.post('/search/compare', async (req, res) => {
  const { query, pincode } = req.body;

  if (!query || !pincode) {
    return res.status(400).json({ error: 'Query and pincode required.' });
  }

  const location = await fetchLocation(pincode);

  if (!location?.latitude) {
    return res.status(400).json({ error: 'Try searching with a more specific locality name.' });
  }

  try {
    let swiggyData = [];
    try {
      swiggyData = await swiggyScrape(query, location);
    } catch (err) {
      console.warn('Swiggy scrape failed:', err.message);
    }

    let zeptoData = [];
    try {
      zeptoData = await fetchZeptoPrices(query, pincode);
    } catch (err) {
      console.warn('Zepto scrape failed:', err.message);
    }

    let blinkitData = [];
    try {
      blinkitData = await scrapeBlinkit(query, pincode);
    } catch (err) {
      console.warn('Blinkit scrape failed:', err.message);
    }

    if (!swiggyData.length && !zeptoData.length && !blinkitData.length) {
      return res.status(404).json({ error: 'No data found from any provider.' });
    }

    const comparison = matchProducts(blinkitData, zeptoData, swiggyData);
    res.json(comparison);
  } catch (err) {
    console.error('Comparison error:', err);
    res.status(500).json({ error: 'Comparison failed.' });
  }
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
