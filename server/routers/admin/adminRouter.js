const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const { restrictTo, protect } = require("../../middlewares/auth");
const { validation } = require("../../middlewares/validation");
const validators = require("./adminValidation");

router.use(protect);

router.get("/users", restrictTo("admin"), usersController.getAllUsers);

router.get("/users/:userId", restrictTo("admin"), usersController.getUser);

router.patch(
  "/users/:userId",
  validation(validators.updateUserValidation),
  restrictTo("admin"),
  usersController.updateUser
);

router.patch(
  "/users/delete/:userId",
  restrictTo("admin"),
  usersController.deleteUser
);

module.exports = router;
