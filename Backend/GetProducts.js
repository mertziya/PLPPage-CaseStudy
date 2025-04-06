const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/products', (req, res) => {
  try {
    const filePath = path.join(__dirname, './data/ProductsMockData.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const filteredProducts = data.map(product => ({
      id: product._id?.$oid,
      main_image: product.main_image,
      price: product.price,
      brand: product.vendor?.name,
      name: product.names?.en
    }));

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = filteredProducts.slice(startIndex, endIndex);

    res.json({
      currentPage: page,
      totalItems: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      data: paginatedData
    });
  } catch (err) {
    console.error('❌ Error occurred:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;