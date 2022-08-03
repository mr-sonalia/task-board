import { NextFunction, Request, Response } from "express";
import logger from "./logger";

const requestLogger = 
(request: Request, response: Response, next: NextFunction) => {
	logger.info(
		`${request.method} ${request.path} ${JSON.stringify(request.body)}`,
	);
	next();
};

const unknownEndpoint = 
(request: Request, response: Response) => {
	response
		.status(404)
		.send({ error: "Unknown endpoint" });
};

const errorHandler = 
(error: any, request: Request, response: Response,next: NextFunction) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}
	next(error);
}

export default {
	requestLogger,
	unknownEndpoint,
	errorHandler
};
