const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ['Fuel', 'Labor', 'Maintenance', 'Packaging', 'Misc', 'Fixed'], required: true },
  amount: { type: Number, required: true },
  notes: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);
