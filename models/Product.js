const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  milkType: { type: String, required: true },
  sizesAvailable: [String],
  notes: String
});

module.exports = mongoose.model('Product', ProductSchema);
