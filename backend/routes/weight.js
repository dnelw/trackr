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
        user.weight.push({
          date: req.body.date,
          weight: req.body.weight,
        });
        user
          .save()
          .then((_) => {
            res.json({ message: "Entry saved successfully" });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: "There was an error saving your entry" });
          });
      }
    });
  }
});

router.delete("/:sub", jwtCheck, (req, res) => {
  const claimSub = req.user.sub;
  const requestSub = decodeURIComponent(req.params.sub);
  if (requestSub !== claimSub) {
    res.status(403).json();
  } else {
    User.findOne({ sub: claimSub }).then((user) => {
      if (!user) {
        res.status(404).json();
      } else {
        const lenBefore = user.weight.length;
        user.weight = user.weight.filter((entry) => {
          return entry.date.getTime() !== new Date(req.body.date).getTime();
        });
        const lenAfter = user.weight.length;
        if (lenBefore === lenAfter + 1) {
          user
            .save()
            .then((_) => {
              res.json({ message: "Entry deleted successfully" });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ error: "There was an error saving your entry" });
            });
        } else {
          res.status(404).json({ error: "Entry not found" });
        }
      }
    });
  }
});

module.exports = router;
