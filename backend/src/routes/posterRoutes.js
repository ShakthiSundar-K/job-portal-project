import express from "express";
import verifyAuth from "../middleware/verifyAuth.js";
import {
  createJobPosterProfile,
  updateJobPosterProfile,
} from "../controllers/jobPosterController.js";
const router = express.Router();

// job poster routes
router.post("/createJobPosterProfile", verifyAuth, createJobPosterProfile);
router.put("/updateJobPosterProfile", verifyAuth, updateJobPosterProfile);

export default router;
