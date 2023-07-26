import express from "express";
import {
	getActivities,
	getActivityById,
	updateActivityById,
	deleteActivity,
	uploadActivity,
	getActivitiesCount
} from "../controllers/activity.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/activities/count", getActivitiesCount);
router.get("/activities", getActivities);
router.get("/activities/:id", getActivityById);
router.post("/activities", uploadActivity);
router.patch("/activities/:id", updateActivityById);
router.delete("/activities/:id", deleteActivity);

export default router;
