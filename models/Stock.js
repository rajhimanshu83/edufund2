const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StockSchema = new Schema({
  companyname: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }
});

module.exports = Stock = mongoose.model('stock', StockSchema);