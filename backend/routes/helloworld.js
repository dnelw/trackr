const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = router;
