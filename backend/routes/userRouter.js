const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");
const userController = require("../controller/userController");
const { authUser, authUserRole } = require("../middleware/auth");

// Signup
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.get("/me", authUser, userController.getMe, userController.getSingleUser);
router.patch("/updateUser", authUser, userController.updateUser);

router.patch("/updateMypassword", authUser, authController.updateMyPassword);

router.get("/", authUser, authUserRole("admin"), userController.getAllUsers);

router
  .route("/:id")
  .get(authUser, authUserRole("admin"), userController.getSingleUser)
  .patch(authUser, authUserRole("admin"), userController.updateUserForAdmin)
  .delete(authUser, authUserRole("admin"), userController.deleteUserForAdmin);

module.exports = router;
