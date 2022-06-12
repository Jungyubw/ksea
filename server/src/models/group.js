const mongoose = require("mongoose");
const validator = require("validator");

const GroupSchema = new mongoose.Schema({
  groupCode: {
    type: String,
    trim: true,
  },
  groupDesc: {
    type: String,
    trim: true,
  },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;