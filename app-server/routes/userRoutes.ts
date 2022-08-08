/** @format */

import * as bcrypt from "bcrypt";
import { Router } from "express";
import { Types } from "mongoose";
import { TaskList, User } from "../models";
import { IUser } from "../types";

const userRouter = Router();

// Get all users
userRouter.get("/", async (req, res, next) => {
	try {
		const users = await User.find({});

		res.status(200).json({
			users,
			message: `Found ${users.length} user(s)`,
		});
	} catch (error) {
		next(error);
	}
});

// Get user by id
userRouter.get("/:user_id", async (req, res, next) => {
	try {
		const { user_id } = req.params;
		const user = await User.findById(user_id);

		if (!user)
			return res
				.status(404)
				.json({ message: "User not found", id: user_id });

		res.status(200).json({ message: "User found", user });
	} catch (error) {
		next(error);
	}
});

// Create new user
userRouter.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const userExists = await User.findOne({
			$or: [{ username: data.username }, { email: data.email }],
		});

		if(!!userExists)
		return res.status(409).json({ error: "User already exists" });
		
		const passwordHash = 
			await bcrypt.hash(data.password, +process.env.SALT_ROUNDS!);
		
		const newUserData: IUser = {
			username: data.username,
			name: data.name,
			email: data.email,
			passwordHash,
			task_list_ref: [],
		}

		const newUser = await new User(newUserData).save();

		res.status(201).json({
			message: "New user created",
			new_user: newUser,
		});

	} catch (error) {
		next(error);
	}
});

// Update user password
userRouter.patch("/", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userExists = await User.findOne({ email });

		if(!userExists) 
			return res.status(404).json({message: "User not found"});
		
		const updatedUserPassword = await User.updateOne(
			{ email },
			{ password },
		);

		res.status(200).json({message: "Password change successful"});
	} catch (error) {
		next(error);
	}
});

// Delete user account
userRouter.delete("/", async(req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOneAndDelete({ email, password });

		if(!user) 
			return res.status(404).json({ message: "User not found" });

		await TaskList.deleteMany({_user_id: user._id});
		res
			.status(200)
			.json({ message: `User ${user.username} account deleted.` });

	} catch (error) {
		next(error);
	}
})

export default userRouter;
