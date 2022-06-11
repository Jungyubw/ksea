const mongoose = require("mongoose");
const validator = require("validator");

// 스키마 생성
const UserSchema = new mongoose.Schema({
  memberId: {
    type: String,
    trim: true,
  },
  KSEAId: {
    type: String,
    trim: true,
  },
  loginId: {
    type: String,
    trim: true,
    required: true,
  },
  loginPw: {
    type: String,
    trim: true,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  dob: {
    type: String,
    trim: true,
  },
  birth: {
    type: Date,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  homepageUrl: {
    type: String,
    trim: true,
  },
  pictureFile: {
    type: String,
    trim: true,
  },
  resumeFile: {
    type: String,
    trim: true,
  },
  homePhone: {
    type: String,
    trim: true,
  },
  homeCell: {
    type: String,
    trim: true,
  },
  homeFax: {
    type: String,
    trim: true,
  },
  homeStreet: {
    type: String,
    trim: true,
  },
  homeCity: {
    type: String,
    trim: true,
  },
  homeState: {
    type: String,
    trim: true,
  },
  homeProvince: {
    type: String,
    trim: true,
  },
  homeZip: {
    type: String,
    trim: true,
  },
  billFirstName: {
    type: String,
    trim: true,
  },
  billLastName: {
    type: String,
    trim: true,
  },
  billStreet: {
    type: String,
    trim: true,
  },
  billCity: {
    type: String,
    trim: true,
  },
  billState: {
    type: String,
    trim: true,
  },
  billProvince: {
    type: String,
    trim: true,
  },
  billZip: {
    type: String,
    trim: true,
  },
  affiliation: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  workHomeUrl: {
    type: String,
    trim: true,
  },
  workEmail: {
    type: String,
    trim: true,
  },
  workPhone: {
    type: String,
    trim: true,
  },
  workStreet: {
    type: String,
    trim: true,
  },
  workCity: {
    type: String,
    trim: true,
  },
  workState: {
    type: String,
    trim: true,
  },
  workProvince: {
    type: String,
    trim: true,
  },
  workZip: {
    type: String,
    trim: true,
  },
  prefContact: {
    type: String,
    trim: true,
  },
  isInMemberDir: {
    type: String,
    trim: true,
  },
  memberType: {
    type: String,
    trim: true,
  },
  isYPG: {
    type: String,
    trim: true,
  },
  memberStatus: {
    type: String,
    trim: true,
  },
  accessRight: {
    type: String,
    trim: true,
  },
  registeredDate: {
    type: String,
    trim: true,
  },
  registeredDateFormatted: {
    type: Date,
    trim: true,
  },
  lastUpdated: {
    type: String,
    trim: true,
  },
  lastUpdatedFormatted: {
    type: Date,
    trim: true,
  },
  lastIPUsed: {
    type: String,
    trim: true,
  },
  updatedBy: {
    type: String,
    trim: true,
  },
  lastVisit: {
    type: String,
    trim: true,
  },
  lastVisitFormatted: {
    type: Date,
    trim: true,
  },
  visitCount: {
    type: String,
    trim: true,
  },
  visitCountFormatted: {
    type: Number,
    trim: true,
  },
  lastPaidDate: {
    type: String,
    trim: true,
  },
  lastPaidDateFormatted: {
    type: Date,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  workFax: {
    type: String,
    trim: true,
  },
  birthPlace: {
    type: String,
    trim: true,
  },
  workCountry: {
    type: String,
    trim: true,
  },
  citizenship: {
    type: String,
    trim: true,
  },
  homeCountry: {
    type: String,
    trim: true,
  },
  specialtyKeywords: {
    type: String,
    trim: true,
  },
  remark: {
    type: String,
    trim: true,
  },
  profileStatus: {
    type: String,
    trim: true,
  },
  e_signature: {
    type: String,
    trim: true,
  },
  kofst_agree: {
    type: String,
    trim: true,
  },
  subscription: {
    type: String,
    trim: true,
  },
  
  

  saveDate: {
    type: Date,
    default: Date.now,
  },
});

// 모델 생성
const User = mongoose.model("User", UserSchema);

module.exports = User;