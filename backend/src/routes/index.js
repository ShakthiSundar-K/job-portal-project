import express from "express";
import userRoutes from "./userRoutes.js";
import posterRoutes from "./posterRoutes.js";
import jobRoutes from "./jobRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/job-poster", posterRoutes);
router.use("/job", jobRoutes);

export default router;
