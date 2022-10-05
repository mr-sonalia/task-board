import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskListDTO } from "./dtos/create-tasklist.dto";
import { TaskList, TaskListDocument } from "./schemas/tasklist.schema";

@Injectable()
export class TasklistService {
	constructor(
		@InjectModel(TaskList.name)
		private taskListModel: Model<TaskListDocument>,
	) {}

	async findAll(): Promise<TaskList[]> {
		return this.taskListModel.find({});
	}

	async create(taskListDto: CreateTaskListDTO): Promise<TaskList> {
		return await this.taskListModel.create(taskListDto);
	}

	async findByListId(listId: string): Promise<TaskList> {
		return this.taskListModel.findById(listId);
	}
}
