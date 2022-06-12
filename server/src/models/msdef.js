const mongoose = require("mongoose");
const validator = require("validator");

const MainSPECIALITYDEFSchema = new mongoose.Schema({
  MainSpecialtyCode: {
    type: String,
    trim: true,
  },
  MainSpecialtyDesc: {
    type: String,
    trim: true,
  },
});

const MainSpecialty = mongoose.model("MainSpecialty", MainSPECIALITYDEFSchema);

module.exports = MainSpecialty;