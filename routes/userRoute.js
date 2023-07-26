import express from "express";
import refreshToken from "../controllers/refreshToken.js";

import {
	getAllUser,
	register,
	login,
	deleteUser,
	getUserCount,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/users/count", getUserCount);
router.get("/users", getAllUser);
router.post("/users", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/users/:id", deleteUser);

export default router;
