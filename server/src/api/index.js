const express = require("express");
const router = express.Router();
const user = require("./user");
const chapter = require("./chapter");
const group = require("./group");
const aps = require("./aps");
const specialty = require("./specialty");
const mainSpecialty = require("./msdef");

router.use("/users", user);
router.use("/chapters", chapter);
router.use("/groups", group);
router.use("/aps", aps);
router.use("/specialty", specialty);
router.use("/msdef", mainSpecialty);

module.exports = router;