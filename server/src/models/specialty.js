const mongoose = require("mongoose");
const validator = require("validator");

const SPECIALITYDEFSchema = new mongoose.Schema({
  SS_ID: {
    type: String,
    trim: true,
  },
  SubSpecialtyCode: {
    type: String,
    trim: true,
  },
  SubSpecialtyDesc: {
    type: String,
    trim: true,
  },
  MainSpecialtyCode: {
    type: String,
    trim: true,
  },
  MainSpecialtyDesc: {
    type: String,
    trim: true,
  },
  NRFCode: {
    type: String,
    trim: true,
  },
});

const Specialty = mongoose.model("Specialty", SPECIALITYDEFSchema);

module.exports = Specialty;