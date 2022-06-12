const express = require("express");
const router = express.Router();
const msdefController = require("./msdef.ctrl");

router.post("", msdefController.msdefCreate);
router.get("", msdefController.msdefList);
router.get("/:id", msdefController.msdefRead);
router.patch("/:id", msdefController.msdefUpdate);
router.delete("/:id", msdefController.msdefDelete);

module.exports = router;