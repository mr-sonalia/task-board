/** @format */

import { model, Schema, Types } from "mongoose";
import { ITaskList } from "../types";

const TaskListSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	user_id: { type: Types.ObjectId, required: true },
	list_creation_date: { type: Date, required: true },
	list_title: { type: String, required: true },
	tasks: [
		{
			_id: { type: Types.ObjectId, required: true },
			task_title: { type: String, required: true },
			task_description: { type: String, required: false },
			task_completion_status: { type: Boolean, required: false },
			task_creation_date: { type: Date, required: true },
			task_deadline: { type: Date, required: true },
		},
	],
});

TaskListSchema.set("toJSON", {
	transform(doc, ret) {
		ret.task_id = ret._id.toString();

		delete ret._id;
		delete ret.__v;
	},
});

const TaskList = model<ITaskList>("tasklist", TaskListSchema);

export default TaskList;
