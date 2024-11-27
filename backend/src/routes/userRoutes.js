import express from "express";
import authController from "../controllers/authController.js";
import { updateUserProfile } from "../controllers/userController.js";
import verifyAuth from "../middleware/verifyAuth.js";
import {
  applyForJob,
  getApplicationsForJob,
  getUserApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
const router = express.Router();

// Authentication Routes
router.post("/createUser", authController.createUser);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);

//user routes
router.put("/updateUser", verifyAuth, updateUserProfile);

//application routes
router.post("/applyForJob", verifyAuth, applyForJob);
router.get("getApplicationsForJob", verifyAuth, getApplicationsForJob);
router.put("/updateApplicationStatus", verifyAuth, updateApplicationStatus);
router.get("/getUserApplications", verifyAuth, getUserApplications);

export default router;
