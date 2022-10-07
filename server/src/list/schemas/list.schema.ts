import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Board } from "src/board/schemas/board.schema";
import { CommonSchemaProps } from "src/common/schemas/common.schema";
import { Task } from "src/task/schemas/task.schema";
import { User } from "src/user/schemas/user.schema";

@Schema({
	toJSON: {
		transform(doc, ret) {
			ret.listId = ret._id.toString();

			delete ret._id;
			delete ret.__v;
		},
	},
})
export class List extends CommonSchemaProps {
	@Prop({ required: true })
	title: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	owner: User;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Board" })
	board: Board;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }] })
	tasks: Task[];
}

export type ListDocument = List & Document;
const ListSchema = SchemaFactory.createForClass(List);

export default ListSchema;
