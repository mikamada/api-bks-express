import express from "express";
import { addPartner, getAllPartner } from "../controllers/partnerController.js";
import { upload } from "../middleware/uploads.js";

const router = express.Router();

router.get("/partner", getAllPartner);
router.post("/partner", upload.any(), addPartner);

export default router;
