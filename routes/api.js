const express = require("express");
const router = express.Router();
const Ninja = require("./../models/ninja");
// const bodyParser = require('body-parser');

///get the list of nijas from database
router.get("/ninjas", (req, res, next) => {
  Ninja.find({}).then((ninjas) => {
    res.send(ninjas);
  });
});

//Add a new ninja to the Database
router.post("/ninjas", (req, res, next) => {
  Ninja.create(req.body)
    .then((ninja) => {
      res.send(ninja);
    })
    .catch(next);
});

//Update the ninja in database
router.put("/ninjas/:id", (req, res, next) => {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then((ninja) => {
    Ninja.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja);
    });
  });
});

//Delete Ninja from the database
router.delete("/ninjas/:id", (req, res, next) => {
  Ninja.findByIdAndDelete({ _id: req.params.id }).then((ninja) => {
    res.send(ninja);
  });
});

module.exports = router;
