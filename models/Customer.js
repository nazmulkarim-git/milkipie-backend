const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  customerType: { type: String, enum: ['B2B', 'B2C'], required: true },
  customerId: { type: String, unique: true, required: true },
  preferredTime: String,
  subscription: {
    milkType: String,
    size: String,
    quantity: Number,
    deliveryMode: String,
    deliveryTime: String,
    frequency: String,
    pricePerUnit: Number,
    specialInstruction: String
  },
  balance: { type: Number, default: 0 }, // positive = prepaid, negative = due
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);
