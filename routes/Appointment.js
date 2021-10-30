const express = require("express");
const router = express.Router();
const auth = require("./../middleware/Auth");
const Appoointment = require("./../models/Appointment");

router.post("/create", (req, auth, res) => {
  const { doctor_id, date_time } = req.body;

  if (!doctor_id || !date_time) {
    return res.status(400).json({ msg: "Validation Error" });
  }
});
