const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  Order: String,
  Address: String,
  Phone: String,
  TotalPrice: Number,
});

module.exports = mongoose.model("Order", OrderSchema);
