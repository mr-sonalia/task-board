import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { loginRouter, tasklistRouter, userRouter } from "./routes";
import logger from "./utils/logger";
import middlewares from "./utils/middlewares";

dotenv.config();

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URI = process.env.MONGODB_URI!;


logger.info("Attempting DB connection");

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		logger.success("Successfully connected to database");
	})
	.catch((error) => logger.error(error));


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use("/api/blogs", blogsRouter);
app.use("/api/tasklists", tasklistRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middlewares.errorHandler);
app.use(middlewares.unknownEndpoint);

export default app;