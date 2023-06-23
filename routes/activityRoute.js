import express from "express";
import {
	getActivities,
	getActivityById,
	addActivity,
	updateActivity,
	deleteActivity,
} from "../controllers/activity.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/activities", getActivities);
router.get("/activities/:id", getActivityById);
router.post("/activities", addActivity);
router.patch("/activities/:id", updateActivity);
router.delete("/activities/:id", deleteActivity);

export default router;
