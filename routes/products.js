const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Add product
router.post('/', auth(['admin']), async (req, res) => {
  const { milkType, sizesAvailable, notes } = req.body;
  const product = new Product({ milkType, sizesAvailable, notes });
  await product.save();
  res.status(201).json(product);
});

// Get all products
router.get('/', auth(['admin', 'manager', 'editor']), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
