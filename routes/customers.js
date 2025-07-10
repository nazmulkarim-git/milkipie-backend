const express = require('express');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const router = express.Router();

// Add new customer
router.post('/', auth(['admin', 'manager']), async (req, res) => {
  try {
    const { name, address, phone, customerType, customerId, preferredTime, subscription } = req.body;
    const customer = new Customer({ name, address, phone, customerType, customerId, preferredTime, subscription });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all customers
router.get('/', auth(['admin', 'manager', 'editor']), async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single customer
router.get('/:id', auth(['admin', 'manager', 'editor']), async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update customer
router.put('/:id', auth(['admin', 'manager']), async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete customer
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
