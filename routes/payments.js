const express = require('express');
const Payment = require('../models/Payment');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const router = express.Router();

// Add payment for customer
router.post('/', auth(['admin', 'manager']), async (req, res) => {
  const { customerId, amount, method } = req.body;
  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });

  const payment = new Payment({ customer: customerId, amount, method });
  await payment.save();

  // Update balance
  customer.balance += amount;
  await customer.save();

  res.status(201).json(payment);
});

// Get payment history for customer
router.get('/customer/:id', auth(['admin', 'manager', 'editor']), async (req, res) => {
  const payments = await Payment.find({ customer: req.params.id });
  res.json(payments);
});

module.exports = router;
