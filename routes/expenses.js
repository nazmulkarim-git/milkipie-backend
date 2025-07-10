const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

// Add expense
router.post('/', auth(['admin', 'manager']), async (req, res) => {
  const { date, category, amount, notes } = req.body;
  const expense = new Expense({ date, category, amount, notes });
  await expense.save();
  res.status(201).json(expense);
});

// Get expenses (optionally filter by week/month)
router.get('/', auth(['admin', 'manager', 'editor']), async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

module.exports = router;
