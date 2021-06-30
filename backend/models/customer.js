const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  Username: String,
  Name: String,
  Password: String,
  Email: String,
  UserType: String,
});

module.exports = mongoose.model("User", UsersSchema);
