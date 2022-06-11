const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Account", accountSchema);