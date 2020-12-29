const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateSalt, hashPassword } = require("../common/crypto");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const { salt, hashedPassword } = hashPassword(password, generateSalt(16));
  User.findOne({ username }).then((user) => {
    if (user) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const user = new User({
        username: username,
        password: hashedPassword,
        salt,
      });
      user
        .save()
        .then(() => {
          res.json({ message: "should send jwt here" });
          console.log(user);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  });
});

module.exports = router;
