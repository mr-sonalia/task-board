import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./schemas/task.schema";
import TaskListSchema, { TaskList } from "./schemas/tasklist.schema";
import { TasklistController } from "./tasklist.controller";
import { TasklistService } from "./tasklist.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskList.name, schema: TaskListSchema },
			{ name: Task.name, schema: TaskSchema },
		]),
	],
	controllers: [TasklistController],
	providers: [TasklistService],
})
export class TaskListModule {}
