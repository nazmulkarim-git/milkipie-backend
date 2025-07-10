const express = require('express');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Inventory = require('../models/Inventory');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth(['admin', 'manager']), async (req, res) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const deliveries = await Order.find({ date: { $gte: today, $lt: tomorrow } });
  const cashCollected = await Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
  const inventory = await Inventory.find();
  const duesSummary = await Customer.aggregate([{ $group: { _id: null, total: { $sum: "$balance" } } }]);
  const topCustomers = await Customer.find().sort({ balance: -1 }).limit(5);
  const outstandingBalances = await Customer.find({ balance: { $lt: 0 } });

  // P&L (simplified)
  const totalPayments = cashCollected[0]?.total || 0;
  const totalExpenses = (await Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]))[0]?.total || 0;
  const pnl = totalPayments - totalExpenses;

  res.json({
    deliveriesToday: deliveries.length,
    cashCollected: totalPayments,
    inventory,
    duesSummary: duesSummary[0]?.total || 0,
    topCustomers,
    outstandingBalances,
    pnl
  });
});

module.exports = router;
