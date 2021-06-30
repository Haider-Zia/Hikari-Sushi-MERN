const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
  DateAndTime: String,
  Phone: String,
  Seats: Number,
});

module.exports = mongoose.model("Reservation", ReservationSchema);
