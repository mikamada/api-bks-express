import express from "express";

import {
	getPartners,
	getPartnerById,
  addPartner,
	updatePartner,
	deletePartner,
} from "../controllers/partner.js";

const router = express.Router();

router.get("/partners", getPartners);
router.get("/partners/:id", getPartnerById);
router.post("/partners", addPartner);
router.patch("/partners/:id", updatePartner);
router.delete("/partners/:id", deletePartner);

export default router;
