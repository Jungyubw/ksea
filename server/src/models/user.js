const mongoose = require("mongoose");
const validator = require("validator");

const ChapterCodeSchema = new mongoose.Schema({
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

const TechnicalGroupSchema = new mongoose.Schema({
  groupCode: {
    type: String,
    trim: true,
  },
  groupDesc: {
    type: String,
    trim: true,
  },
});

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
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Email is invalid");
    //   }
    // },
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

  chapterCode: {
    type: String,
    trim: true,
  },

  chapter: {
    type: ChapterCodeSchema,
  },

  groupCode: {
    type: String,
    trim: true,
  },

  group: {
    type: TechnicalGroupSchema,
  },

  apsList: {
    type: [APSDEFSchema],
  },

  aps1: {
    type: APSDEFSchema,
  },
  aps2: {
    type: APSDEFSchema,
  },
  aps3: {
    type: APSDEFSchema,
  },

  specialtyList: {
    type: [SPECIALITYDEFSchema],
  },

  specialty1: {
    type: SPECIALITYDEFSchema,
  },
  specialty2: {
    type: SPECIALITYDEFSchema,
  },
  specialty3: {
    type: SPECIALITYDEFSchema,
  },

  saveDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;