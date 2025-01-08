const express = require("express");
const controller = require("../controllers/users");
const authenticate = require("../middleware/authenticate");
const permission = require("../middleware/permission");

const router = express.Router();

router.post(
  "/",
  authenticate,
  permission("USERS::CREATE_USER"),
  controller.create,
);

router.get(
  "/",
  authenticate,
  permission("USERS::VIEW_USERS"),
  controller.fetchAll,
);
router.get(
  "/paginate",
  authenticate,
  permission("USERS::VIEW_USERS"),
  controller.paginate,
);
router.patch(
  "/:id",
  authenticate,
  permission("USERS::UPDATE_USER"),
  controller.updateOne,
);
router.get(
  "/:id",
  authenticate,
  permission("USERS::VIEW_USERS"),
  controller.fetchOne,
);

router.delete(
  "/:id",
  authenticate,
  permission("USERS::REMOVE_USER"),
  controller.remove,
);

module.exports = router;
