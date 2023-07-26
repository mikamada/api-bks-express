import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import fileUpload from "express-fileupload";
import userRoute from "./routes/userRoute.js";
import partnerRoute from "./routes/partnerRoute.js";
import activityRoute from "./routes/activityRoute.js";
import visionRoute from "./routes/visionRoute.js";
import profileRoute from "./routes/profileRoute.js";
import contentRoute from "./routes/contentRoute.js";
import logger from "morgan";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "dygyevmnq",
	api_key: "392855657978464",
	api_secret: "CF_nWaSekpsdo97fJEmDxhHTYt8",
});

dotenv.config();

const app = express();

// (async () => {
// 	await db.sync();
// })();

try {
	await db.authenticate();
	console.log("Database connected");
} catch (error) {
	console.log(error);
}

app.use(
	cors({
		credentials: true,
		origin: [
			"http://localhost:3000",
			"http://localhost",
			process.env.LOCAL_CLIENT,
			process.env.PRODUCTION_CLIENT,
			process.env.FRONT_CLIENT,
		],
	})
);

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(userRoute);
app.use(partnerRoute);
app.use(activityRoute);
app.use(visionRoute);
app.use(profileRoute);
app.use(contentRoute);

const port = 3000;

app.listen(port, () =>
	console.log(`Server running at ${process.env.HOST_SERVER} port ${port}`)
);
