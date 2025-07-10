const express = require('express');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const router = express.Router();

// Generate daily orders for all subscriptions (to be triggered via cron or button)
router.post('/generate', auth(['admin', 'manager']), async (req, res) => {
  const today = new Date();
  const customers = await Customer.find();

  let orders = [];
  for (let cust of customers) {
    if (!cust.subscription) continue;

    // Simple frequency: implement daily/alternate/custom logic as needed
    if (cust.subscription.frequency === "Daily") {
      const order = new Order({
        customer: cust._id,
        date: today,
        milkType: cust.subscription.milkType,
        size: cust.subscription.size,
        quantity: cust.subscription.quantity,
        pricePerUnit: cust.subscription.pricePerUnit,
        totalPrice: cust.subscription.quantity * cust.subscription.pricePerUnit,
        deliveryTime: cust.subscription.deliveryTime || cust.preferredTime,
        status: "Pending"
      });
      await order.save();
      orders.push(order);
    }
    // TODO: add alternate/custom logic
  }
  res.status(201).json({ created: orders.length });
});

// Get today's orders (optionally filtered by deliveryTime)
router.get('/today', auth(['admin', 'manager', 'editor']), async (req, res) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const orders = await Order.find({
    date: { $gte: today, $lt: tomorrow }
  }).populate('customer');

  res.json(orders);
});

// Update order status/comment
router.put('/:id', auth(['admin', 'manager', 'editor']), async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

module.exports = router;
