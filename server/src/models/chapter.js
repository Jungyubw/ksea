const mongoose = require("mongoose");
const validator = require("validator");

const ChapterSchema = new mongoose.Schema({
  chapterCode: {
    type: String,
    trim: true,
  },
  chapterType: {
    type: String,
    trim: true,
  },
  chapterName: {
    type: String,
    trim: true,
  },
  chapterLoc: {
    type: String,
    trim: true,
  },
  chapterUrl: {
    type: String,
    trim: true,
  },
  subDomain: {
    type: String,
    trim: true,
  },
  presidentId: {
    type: String,
    trim: true,
  },
  MDId: {
    type: String,
    trim: true,
  },
  dateApproved: {
    type: String,
    trim: true,
  },
  kseaId: {
    type: String,
    trim: true,
  },
  pro_code: {
    type: String,
    trim: true,
  },
});

const Chapter = mongoose.model("Chapter", ChapterSchema);

module.exports = Chapter;