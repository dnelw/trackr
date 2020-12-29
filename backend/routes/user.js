const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateSalt, hashPassword, issueJWT } = require("../common/crypto");
const validateJWT = require("../middleware/jwt");

router.get("/:username", validateJWT, (req, res) => {
  const username = req.params.username;
  if (req.user == username) {
    User.findOne({ username }, ["-_id", "username"]).then((user) => {
      if (user) {
        res.json({ user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

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
          const token = issueJWT(username);
          res.json({ token });
          console.log(user);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  });
});

module.exports = router;
