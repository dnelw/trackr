const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { hashPassword } = require("../common/crypto");

router.post("/login", (req, res) => {
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;
  if (reqUsername && reqPassword) {
    User.findOne({ username: reqUsername })
      .then((user) => {
        if (user) {
          const { password, salt } = user;
          if (hashPassword(reqPassword, salt).hashedPassword === password) {
            res.json({ message: "should send jwt here" });
          } else {
            res.status(401).json({ message: "Incorrect username or password" });
          }
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "Missing required information" });
  }
});

module.exports = router;
