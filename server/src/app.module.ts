import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BoardModule } from "./board/board.module";
import { ListModule } from "./list/list.module";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		MongooseModule.forRoot(
			"mongodb+srv://taskBoardAdmin:taskBoard1234@task-board-cluster.savt32q.mongodb.net/",
		),
		TaskModule,
		ListModule,
		BoardModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
