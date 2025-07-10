const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  milkType: String,
  size: String,
  quantity: Number,
  supplierName: String,
  cost: Number,
  outgoing: [
    {
      order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      quantity: Number,
      customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
    }
  ],
  spoilage: [
    {
      date: Date,
      reason: String,
      quantity: Number
    }
  ],
  packaging: {
    bottles: Number,
    pouches: Number,
    crates: Number
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
