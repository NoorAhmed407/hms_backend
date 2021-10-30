const express = require("express");
const mongoose = require("mongoose");

//setup express app
const app = express();

//connect to mongo db
mongoose.connect("mongodb://localhost/hms");
mongoose.Promise = global.Promise;

app.use(express.json());

//Initialized Routes
app.use("/auth", require("./routes/Auth"));
app.use("/appointment", require("./routes/Appointment"));
app.use("/api", require("./routes/api"));

//error handling middleware
app.use((err, req, res, next) => {
  res.send(err.message);
});

//starting server
app.listen(process.env.port || 4000, () => {
  console.log("server started");
});
