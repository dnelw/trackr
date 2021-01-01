const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  sub: {
    type: String,
    unique: true,
    required: true,
  },
  weight: [
    {
      date: {
        type: Date,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
