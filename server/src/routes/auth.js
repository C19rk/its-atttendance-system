import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
// Controllers
import {
  signUp,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  validateResetToken,
  getAllUsers,
  getAllAdminUsers,
  getAllUsersWithRoles,
  getMe,
  updateUserInfo,
  verifyOtpController,
} from "../controllers/authController.js";
// Middlewares
import verifyToken from "../middlewares/verifyToken.js";
import {
  validateSignUp,
  validateLogin,
  validateResetPassword,
  validateChangePassword,
  validateUpdateUserInfo,
} from "../middlewares/validateUser.js";
import enableCors from "../_cors.js";

const router = express.Router();

// Preflight for all routes
router.options("*", (req, res) => enableCors(req, res));

// Multer (Must always be on TOP HERE!!!)
const uploadsDir = path.join(process.cwd(), "uploads");

if (process.env.NODE_ENV !== "production" && !fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage =
  process.env.NODE_ENV === "production"
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadsDir),
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const name = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`;
          cb(null, name + ext);
        },
      });

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("Only image files are allowed!"), false);
    cb(null, true);
  },
});

router.post(
  "/sign-up",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  validateSignUp,
  signUp
);

router.post(
  "/login",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  validateLogin,
  login
);

router.post(
  "/forgot-password",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  forgotPassword
);

router.post(
  "/verify-otp",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  verifyOtpController
);

router.post(
  "/reset-password",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  validateResetPassword,
  resetPassword
);

router.get(
  "/validate-reset-token/:token",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  validateResetToken
);

// Logged in user
router.get(
  "/me",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  verifyToken,
  getMe
);

// Change password
router.post(
  "/change-password",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  validateChangePassword,
  verifyToken,
  changePassword
);

// Update user info
router.put(
  "/update",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  validateUpdateUserInfo,
  verifyToken,
  updateUserInfo
);

router.get(
  "/users",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  verifyToken,
  getAllUsers
);

router.get(
  "/admins",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  verifyToken,
  getAllAdminUsers
);

router.get(
  "/all-users",
  (req, res, next) => {
    if (enableCors(req, res)) return;
    next();
  },
  verifyToken,
  getAllUsersWithRoles
);

export default router;
