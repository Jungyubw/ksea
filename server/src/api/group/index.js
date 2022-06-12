const express = require("express");
const router = express.Router();
const groupController = require("./group.ctrl");

router.post("", groupController.groupCreate);
router.get("", groupController.groupList);
router.get("/:id", groupController.groupRead);
router.patch("/:id", groupController.groupUpdate);
router.delete("/:id", groupController.groupDelete);

module.exports = router;