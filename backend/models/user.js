const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
  },
  datesCompleted: {
    type: Map,
  },
});

const weightSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  sub: {
    type: String,
    unique: true,
    required: true,
  },
  weight: {
    type: [weightSchema],
  },
  habits: {
    type: [habitSchema],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
