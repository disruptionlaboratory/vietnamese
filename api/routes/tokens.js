const express = require("express");
const controller = require("../controllers/tokens");

const router = express.Router();

router.post("/", controller.create);

module.exports = router;
