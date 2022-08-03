import express, { NextFunction, Request, Response } from "express";
import { Blogs } from "../models";

const blogsRouter = express.Router();

blogsRouter.get("/", (request: Request, response: Response, next: NextFunction) => {
	Blogs.find({})
	.then(result => {
		response.status(200).json({
			blogs: result,
			message: `(${result.length}) ${
				result.length === 1 ? "item" : "items"
			} found`,
			path: request.url,
		});
	})
	.catch(error => next(error));
});


blogsRouter.post("/", 
	(request: Request, response: Response, next: NextFunction) => {
		const { body } = request;
		const blog = new Blogs({ ...body, date: new Date() });

		blog.save()
			.then(result => {
				response
					.status(201)
					.json({
						blog: result,
						message: "New item created successfully"
					})
			})
			.catch(error => next(error));
	})

export default blogsRouter;