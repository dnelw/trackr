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
    User.findOne({ claimSub }, []).then((user) => {
      if (!user) {
        res.json({ message: "Create a user here if it doesnt exist!" });
      } else {
        res.json({ user });
      }
    });
  }
});

module.exports = router;
