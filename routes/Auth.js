const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  //Check Simple Validation
  if (!email || !password) {
    //return res.send('Please Enter all the Fields');
    res.status(400).json({ msg: "Please Enter all the feilds" });
  }

  //Check For Existing User
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User Doesn't Exist" });

    //Validate Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      jwt.sign(
        { id: user.id },
        "hms_myjwtSecret",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.status(400).json({
              msg: "Invalid credentials",
            });
          }
          return res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              address: user.address,
            },
          });
        }
      );
    });
  });
});

router.post("/register", (req, res) => {
  const { name, email, password, address } = req.body;

  //Check Simple Validation
  if (!name || !email || !password || !address) {
    if (user)
      return res.status(400).json({ msg: "Please Enter All the fields" });
  }

  //Check For Existing User
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User Already Exist" });

    const newUser = new User({
      name,
      email,
      password,
      address,
    });

    //Create Salt and Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            "hms_myjwtSecret",
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  address: user.address,
                },
              });
            }
          );
        });
      });
    });
  });
});

// router.get("/user", auth, (req, res) => {
//   User.findById(req.user.id)
//     .select("-password")
//     .then((user) => res.json(user));
// });

module.exports = router;
