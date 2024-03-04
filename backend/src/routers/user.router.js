import express from "express";
import {
  isUserAuthenticated,
  isUserAuthorizeAdmin,
} from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updateUserProfile,
  changeUserPassword,
  deleteUser,
} from "../controllers/user.controller.js";
import regenerateTokens from "../utils/regenerateTokens.js";
import {
  deleteUserByID,
  getUserByID,
  updateUserProfileByID,
  usersDetils,
} from "../controllers/admin.controller.js";
const router = express.Router();

/* admin rights */
router
  .route("/allUsers")
  .get(isUserAuthenticated, isUserAuthorizeAdmin, usersDetils);
router
  .route("/userByID/:_id")
  .get(isUserAuthenticated, isUserAuthorizeAdmin, getUserByID);
router
  .route("/updateProfileByID/:_id")
  .put(isUserAuthenticated, isUserAuthorizeAdmin, updateUserProfileByID);
router
  .route("/deleteByID/:_id")
  .delete(isUserAuthenticated, isUserAuthorizeAdmin, deleteUserByID);

/* user rights */
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isUserAuthenticated, logoutUser);
router.route("/Profile").get(isUserAuthenticated, userProfile);
router.route("/refreshTokens").get(regenerateTokens);
router.route("/updateProfile").put(isUserAuthenticated, updateUserProfile);
router.route("/changePassword").put(isUserAuthenticated, changeUserPassword);
router.route("/deleteUser").delete(isUserAuthenticated, deleteUser);

export default router;
