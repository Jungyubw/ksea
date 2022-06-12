const express = require("express");
const router = express.Router();
const chapterController = require("./chapter.ctrl");

router.post("", chapterController.chapterCreate);
router.get("", chapterController.chapterList);
router.get("/:id", chapterController.chapterRead);
router.patch("/:id", chapterController.chapterUpdate);
router.delete("/:id", chapterController.chapterDelete);

module.exports = router;