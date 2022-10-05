import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskListModule } from "./tasklist/tasklist.module";
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';

@Module({
	imports: [
		MongooseModule.forRoot(
			"mongodb+srv://taskBoardAdmin:taskBoard1234@task-board-cluster.savt32q.mongodb.net/tasksDB",
		),
		TaskListModule,
	],
	controllers: [AppController, TaskController],
	providers: [AppService, TaskService],
})
export class AppModule {}
