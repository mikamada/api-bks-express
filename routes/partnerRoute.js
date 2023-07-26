import express from "express";

import {
	getPartners,
	getPartnerById,
	addNewPartner,
	updatePartnerById,
	deletePartner,
	getMouById,
	getUserCount
} from "../controllers/partner.js";

const router = express.Router();

router.get("/partners/count", getUserCount);
router.get("/partners", getPartners);
router.get("/partners/:id", getPartnerById);
router.get("/partners/mou/:id", getMouById)
router.post("/partners", addNewPartner);
router.patch("/partners/:id", updatePartnerById);
router.delete("/partners/:id", deletePartner);

export default router;
