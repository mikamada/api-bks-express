import {
	getProfile,
	addProfile,
	updateProfile,
} from "../controllers/profile.js";
import express from "express";

const router = express.Router();

router.get("/profile/:id", getProfile);
router.post("/profile", addProfile);
router.patch("/profile/:id", updateProfile);

export default router;
