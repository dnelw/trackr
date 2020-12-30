const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  sub: {
    type: String,
    unique: true,
    required: true,
  },
  weight: [
    {
      date: Date,
      weight: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
