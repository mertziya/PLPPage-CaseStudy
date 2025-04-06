const express = require('express');
const app = express();
const PORT = 3000;

const getProductsRoute = require('./GetProducts');
const productRoutes = require('./GetProductDetails');

app.use(express.json());

app.use('/api', getProductsRoute); // handles /api/products
app.use('/api', productRoutes); // Mount the router

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});