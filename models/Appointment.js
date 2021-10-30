const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Ninja Schema and model
const AppointmentSchema = new Schema({
  doctor_id: {
    type: Number,
    required: [true, "doctor_id field is required"],
  },

  date_time: {
    type: Date,
    required: [true, "date_time field is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Appointment = mongoose.model("appointment", AppointmentSchema);

module.exports = Appointment;
