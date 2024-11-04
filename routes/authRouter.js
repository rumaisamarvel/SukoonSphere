import { Router } from "express";
const router = Router();

import {
  changePassword,
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import {
  validateChangePasswordInput,
  validateForgetPasswordInput,
  validateLoginInput,
  validateRegisterInput,
  validateResetPasswordInput,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post(
  "/change-password",
  authenticateUser,
  validateChangePasswordInput,
  changePassword
);
router.post("/forget-password", validateForgetPasswordInput, forgetPassword);

router.post("/reset-password", validateResetPasswordInput, resetPassword);

// not in use yet

// router.post("/verify-email", verifyEmail);
// router.get("/admin-data", getAdminData);
// router.patch(
//   "/update-user-details/:id",
//   authenticateUser,
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "avatar1", maxCount: 1 },
//   ]),
//   updateAdminData
// );

export default router;
