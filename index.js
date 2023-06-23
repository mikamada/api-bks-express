import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import fileUpload from "express-fileupload";
import userRoute from "./routes/userRoute.js";
// import partnerRoute from "./routes/partnerRoute.js";
import partnerRoutes from "./routes/partnersRoute.js"
import activityRoute from "./routes/activityRoute.js";
import visionRoute from "./routes/visionRoute.js";

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
		origin: ["http://localhost:3000", "http://127.0.0.1:5173"],
	})
);

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(userRoute);
// app.use(partnerRoute);
app.use(activityRoute);
app.use(visionRoute);
app.use(partnerRoutes);

app.listen(5000, () => console.log("Server running at port 5000"));
