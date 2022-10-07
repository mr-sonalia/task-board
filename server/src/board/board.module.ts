import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import BoardSchema, { Board } from "./schemas/board.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Board.name,
				schema: BoardSchema,
			},
		]),
	],
	controllers: [BoardController],
	providers: [BoardService],
})
export class BoardModule {}
