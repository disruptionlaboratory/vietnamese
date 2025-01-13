const express = require("express");
const controller = require("../controllers/words");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/paginate", controller.paginate);
router.patch("/:id", authenticate, controller.updateOne);
router.get("/:id", authenticate, controller.fetchOne);

module.exports = router;
