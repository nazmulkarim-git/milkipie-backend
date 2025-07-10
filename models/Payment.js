const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Cash', 'bKash', 'Nagad', 'Other'], default: 'Cash' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
