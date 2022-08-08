/** @format */

import { Types } from "mongoose";

export interface IUser {
	username: string;
	passwordHash: string;
	email: string;
	name: {
		first: string;
		last: string;
		middle?: string;
	};
	task_list_ref: Types.ObjectId[];
}

export interface ITask {
	_id: Types.ObjectId;
	task_title: string;
	task_description?: string;
	task_completion_status: boolean;
	task_creation_date: Date;
	task_deadline: Date;
}

export interface ITaskList {
	_id: Types.ObjectId;
	user_id: Types.ObjectId;
	list_creation_date: Date;
	list_title: string,
	tasks: ITask[];
}
