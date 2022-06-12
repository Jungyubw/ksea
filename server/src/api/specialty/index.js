const express = require("express");
const router = express.Router();
const specialtyController = require("./specialty.ctrl");

router.post("", specialtyController.specialtyCreate);
router.get("", specialtyController.specialtyList);
router.get("/:id", specialtyController.specialtyRead);
router.patch("/:id", specialtyController.specialtyUpdate);
router.delete("/:id", specialtyController.specialtyDelete);

router.get("/init/CSVLoad", specialtyController.initSpecialty);

module.exports = router;