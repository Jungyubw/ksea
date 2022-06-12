const mongoose = require("mongoose");
const validator = require("validator");

const APSDEFSchema = new mongoose.Schema({
  apsID: {
    type: String,
    trim: true,
  },
  apsName: {
    type: String,
    trim: true,
  },
  apsFullName: {
    type: String,
    trim: true,
  },
  apsURL: {
    type: String,
    trim: true,
  },
  temp: {
    type: String,
    trim: true,
  },
  presidentID: {
    type: String,
    trim: true,
  },
  isActive: {
    type: String,
    trim: true,
  },
});

const APSDef = mongoose.model("APSDef", APSDEFSchema);

module.exports = APSDef;