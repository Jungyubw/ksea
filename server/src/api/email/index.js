const express = require("express");
const router = express.Router();
const emailController = require("./email.ctrl");

router.get("", emailController.sendTestEmail);

module.exports = router;