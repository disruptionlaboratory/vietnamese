const express = require("express");
const controller = require("../controllers/contents");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// router.post("/generate", authenticate, controller.generate);
router.post("/generate", controller.generate);

module.exports = router;
