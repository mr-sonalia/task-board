import { Module } from "@nestjs/common/decorators";
import { MongooseModule } from "@nestjs/mongoose";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import ListSchema, { List } from "./schemas/list.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: List.name,
				schema: ListSchema,
			},
		]),
	],
	controllers: [ListController],
	providers: [ListService],
})
export class ListModule {}
