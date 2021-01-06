const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { jwtCheck } = require("../middleware/auth");

router.post("/:sub", jwtCheck, (req, res) => {
  const claimSub = req.user.sub;
  const requestSub = decodeURIComponent(req.params.sub);
  if (requestSub !== claimSub) {
    res.status(403).json();
  } else {
    User.findOne({ sub: claimSub }).then((user) => {
      if (!user) {
        res.status(404).json();
      } else {
        user.habits.push({
          habitName: req.body.habitName,
          datesCompleted: {},
        });
        user
          .save()
          .then((_) => {
            res.json({ message: "Habit saved successfully" });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: "There was an error saving your habit" });
          });
      }
    });
  }
});

module.exports = router;
