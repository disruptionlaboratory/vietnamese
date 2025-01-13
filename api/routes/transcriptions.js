const express = require("express");
const controller = require("../controllers/transcriptions");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// router.post("/transcribe", authenticate, controller.transcribe);
router.post("/transcribe", controller.transcribe);

module.exports = router;
