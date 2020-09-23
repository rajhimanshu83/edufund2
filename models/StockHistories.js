const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Stock histories' schema
const stockHistoriesSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  open: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  adjustedClosePrice: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  }
});

// Export the stockistories' model
module.exports = StockHistory = mongoose.model('StockHistories', stockHistoriesSchema);
