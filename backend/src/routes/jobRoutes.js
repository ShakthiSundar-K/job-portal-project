import express from "express";
import verifyAuth from "../middleware/verifyAuth.js";
import {
  deleteJob,
  editJob,
  filterJobs,
  getAllJobs,
  postJob,
  recommendJobs,
} from "../controllers/jobController.js";
const router = express.Router();

//job routes
router.post("/postJob", verifyAuth, postJob);
router.get("/getAllJobs", verifyAuth, getAllJobs);
router.get("/recommendJobs/:userId", verifyAuth, recommendJobs);
router.get("/filterJobs", verifyAuth, filterJobs);
router.put("/editJob/:id", verifyAuth, editJob);
router.delete("/deleteJob/:id", verifyAuth, deleteJob);

export default router;
