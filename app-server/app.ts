import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { blogsRouter } from "./routes";
import logger from "./utils/logger";
import middlewares from "./utils/middlewares";

dotenv.config();

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URI = process.env.MONGODB_TEST_URI;


logger.info("Attempting DB connection");

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		logger.info("Successfully connected to database");
	})
	.catch((error) => logger.error(error));


const app = express();

// app.use(cors);
app.use(express.json());
app.use(morgan('dev'));
app.use("/api/blogs", blogsRouter);
app.use(middlewares.errorHandler);
app.use(middlewares.unknownEndpoint);

export default app;