const express = require("express");
const controller = require("../controllers/permissions");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", controller.fetchAll);
router.get("/paginate", controller.paginate);
router.patch("/:id", authenticate, controller.updateOne);
router.get("/:id", authenticate, controller.fetchOne);

module.exports = router;
