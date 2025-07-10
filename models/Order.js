const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  date: { type: Date, required: true },
  milkType: String,
  size: String,
  quantity: Number,
  pricePerUnit: Number,
  totalPrice: Number,
  deliveryTime: String,
  status: { type: String, enum: ['Delivered', 'Skipped', 'Pending', 'Issue'], default: 'Pending' },
  comment: String
});

module.exports = mongoose.model('Order', OrderSchema);
