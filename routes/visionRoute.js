import express from "express";
import {
	getVision,
	getVisionById,
	addVision,
	updateVision,
} from "../controllers/vision.js";

const router = express.Router();

router.get("/vision", getVision);
router.get("/vision/:id", getVisionById);
router.post("/vision", addVision);
router.patch("/vision/:id", updateVision);

export default router;
