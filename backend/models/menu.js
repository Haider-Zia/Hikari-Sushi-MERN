const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
  Name: String,
  Price: Number,
});

module.exports = mongoose.model("Menu", MenuSchema);
