const express = require("express");
const router = express.Router();
const apsController = require("./aps.ctrl");

router.post("", apsController.apsCreate);
router.get("", apsController.apsList);
router.get("/:id", apsController.apsRead);
router.patch("/:id", apsController.apsUpdate);
router.delete("/:id", apsController.apsDelete);

module.exports = router;