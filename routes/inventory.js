const express = require('express');
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');
const router = express.Router();

// Add new incoming stock
router.post('/incoming', auth(['admin', 'manager']), async (req, res) => {
  const { milkType, size, quantity, supplierName, cost } = req.body;
  const inventory = new Inventory({ milkType, size, quantity, supplierName, cost });
  await inventory.save();
  res.status(201).json(inventory);
});

// Log spoilage
router.post('/spoilage/:id', auth(['admin', 'manager']), async (req, res) => {
  const { reason, quantity } = req.body;
  const inventory = await Inventory.findById(req.params.id);
  if (!inventory) return res.status(404).json({ message: "Inventory not found" });
  inventory.spoilage.push({ date: new Date(), reason, quantity });
  await inventory.save();
  res.json(inventory);
});

// Update packaging (bottles/pouches/crates)
router.put('/packaging/:id', auth(['admin', 'manager']), async (req, res) => {
  const { bottles, pouches, crates } = req.body;
  const inventory = await Inventory.findById(req.params.id);
  if (!inventory) return res.status(404).json({ message: "Inventory not found" });
  inventory.packaging = { bottles, pouches, crates };
  await inventory.save();
  res.json(inventory);
});

// Get all inventory
router.get('/', auth(['admin', 'manager', 'editor']), async (req, res) => {
  const inventories = await Inventory.find();
  res.json(inventories);
});

module.exports = router;
