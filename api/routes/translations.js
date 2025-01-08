const express = require("express");
const controller = require("../controllers/translations");
const authenticate = require("../middleware/authenticate");
const permission = require("../middleware/permission");

const router = express.Router();

router.get("/", controller.fetchAll);
router.get("/paginate", controller.paginate);
router.patch(
  "/:id",
  authenticate,
  permission("TRANSLATIONS::UPDATE_TRANSLATION"),
  controller.updateOne,
);
router.get("/:id", authenticate, controller.fetchOne);
router.post(
  "/",
  authenticate,
  permission("TRANSLATIONS::CREATE_TRANSLATION"),
  controller.create,
);
router.delete(
  "/:id",
  authenticate,
  permission("TRANSLATIONS::REMOVE_TRANSLATION"),
  controller.remove,
);

module.exports = router;
