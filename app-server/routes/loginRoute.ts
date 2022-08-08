import bcrypt from "bcrypt";
import { Router } from "express";
import { User } from "../models";

const loginRouter = Router();

// User Login
loginRouter.post("/", async (req, res, next) => {
	try {
		const { usernameOrEmail, password } = req.body;

		const user = await User.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		});

		if(!user) 
		return res
			.status(200)
			.json({ user: [], error: `User does not exist` });
			
		const passwordMatch = 
			await bcrypt.compare(password, user.passwordHash!);

		if(!passwordMatch)
			return res.status(200).json({user: [], error: "Incorrect password" });

		const userAggregate = await User.aggregate([
			{
				$lookup: {
					from: "tasklists",
					localField: "task_list_ref",
					foreignField: "_id",
					as: "lists",
				},
			},
			{
				$match: {
					$or: [
						{ username: usernameOrEmail },
						{ email: usernameOrEmail },
					],
				},
			},
			{
				$project: {
					task_list_ref: 0,
					__v: 0,
					"lists.user_id": 0,
					"lists.__v": 0,
				},
			},
		]);
		
		const transformedData = userAggregate[0];
		delete transformedData.passwordHash;

		res.status(200).json({ user: transformedData, error: "" });

	} catch (error) {
		next(error);
	}
});

export default loginRouter;