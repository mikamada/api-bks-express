import {
	getContent,
	getContentById,
	addContent,
	updateContent,
} from "../controllers/content.js";
import express from "express";

const router = express.Router();

router.get("/contents", getContent);
router.get("/contents/:id", getContentById);
router.post("/contents", addContent);
router.patch("/contents/:id", updateContent);

export default router;
