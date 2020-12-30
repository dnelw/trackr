const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { jwtCheck } = require("../middleware/auth");

router.get("/:sub", jwtCheck, (req, res) => {
  const claimSub = req.user.sub;
  const requestSub = decodeURIComponent(req.params.sub);
  if (requestSub !== claimSub) {
    res.status(403).json();
  } else {
    User.findOne({ sub: claimSub }).then((user) => {
      if (!user) {
        const user = new User({
          sub: claimSub,
          weight: [],
        });
        user
          .save()
          .then((data) => {
            res.json({
              message: "Created a new user successfully",
              user: data,
            });
          })
          .catch((err) => {
            res.status(500).json({ error: "Something went wrong!" });
            console.log(err);
          });
      } else {
        res.json({ user });
      }
    });
  }
});

module.exports = router;
