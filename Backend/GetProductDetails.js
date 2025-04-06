const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// GET product detail by ID
router.get('/productDetail/:id', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, './data/ProductsMockData.json');

  try {
    const rawData = fs.readFileSync(filePath);
    const products = JSON.parse(rawData);

    const product = products.find(item => item._id?.$oid === id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }

  } catch (error) {
    console.error('Error reading product data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;