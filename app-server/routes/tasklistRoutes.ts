/** @format */

import bcrypt from "bcrypt";
import { Router } from "express";
import { Types } from "mongoose";
import { TaskList, User } from "../models";
import { ITask, ITaskList } from "../types";

const tasklistRouter = Router();

// Create new task list
tasklistRouter.post("/", async (req, res, next) => {
	const { username, password, user_id, list_title } = req.body;
	try {
		const user = await User.findOne({ username });

		if (!user)
			return res
				.status(401)
				.json({ error: `${username} does not exist` });

		const passwordMatch = await bcrypt.compare(password, user.passwordHash);

		if (!passwordMatch)
			return res.send(400).json({ error: "Incorrect password" });

		const newTaskListData: ITaskList = {
			list_creation_date: new Date(),
			user_id,
			list_title,
			tasks: [],
			_id: new Types.ObjectId(),
		};

		const newTaskList = await new TaskList(newTaskListData).save();

		user.task_list_ref = user.task_list_ref.concat(newTaskList.id);
		await user.save();

		res.status(201).json({
			message: "New list created",
			list: newTaskList,
		});
	} catch (error) {
		next(error);
	}
});

// Update task list title
tasklistRouter.patch("/", async (req, res, next) => {
	const { list_id, list_title } = req.body;
	try {
		const taskList = await TaskList.findById(list_id);

		if (!taskList) return res.status(404).json({ error: "List not found" });

		if (list_title === taskList.list_title)
			res.status(304).json({ message: "Title remains unchanged" });

		taskList.list_title = list_title;
		await taskList.save();

		res.status(200).json({ message: "List title  changed", list_title });
	} catch (error) {
		next(error);
	}
});

// Delete task list
tasklistRouter.delete("/", async (req, res, next) => {
	const { list_id } = req.body;
	try {
		const taskList = await TaskList.findOneAndDelete({ _id: list_id });

		if (!taskList)
			return res.status(404).json({ error: "List does not exist" });

		res.status(204);
	} catch (error) {
		next(error);
	}
});

// Create new task
tasklistRouter.post("/task", async (req, res, next) => {
	const {
		username,
		password,
		task_title,
		task_description,
		task_deadline,
		list_id,
	} = req.body;
	try {
		const user = await User.findOne({ username });

		if (!user)
			return res.status(401).json({ error: `${username} does not exit` });

		const passwordMatch = await bcrypt.compare(password, user.passwordHash);

		if (!passwordMatch)
			return res.status(401).json({ error: "Invalid password" });

		const newTaskData: ITask = {
			_id: new Types.ObjectId(),
			task_title,
			task_description: task_description || "",
			task_completion_status: false,
			task_creation_date: new Date(),
			task_deadline: new Date(task_deadline),
		};

		const taskList = await TaskList.findById(list_id);

		if (!taskList)
			return res.status(404).json({ error: "List not found", list_id });

		taskList.tasks = [newTaskData, ...taskList.tasks];
		taskList.save();

		res.status(201).json({
			message: "New task created",
			task: newTaskData,
		});
	} catch (error) {
		next(error);
	}
});

// Delete task
tasklistRouter.delete("/task", async (req, res, next) => {
	const { list_id, task_id } = req.body;
	try {
		const list = await TaskList.findById(list_id);

		if (!list) return res.status(404).json({ error: "List not found" });

		const updatedTasks = list.tasks.filter(
			task => task._id !== task_id,
		);

		if (updatedTasks.length === list.tasks.length)
			return res.status(401).json({ error: "task not found" });

		res.status(200).json({ message: "Task deleted successfully" }); 
	} catch (error) {
		next(error);
	}
});

export default tasklistRouter;
