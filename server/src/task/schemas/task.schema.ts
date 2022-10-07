import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Board } from "src/board/schemas/board.schema";
import { CommonSchemaProps } from "src/common/schemas/common.schema";
import { List } from "src/list/schemas/list.schema";
import { User } from "src/user/schemas/user.schema";

@Schema({
	toJSON: {
		transform(doc, ret) {
			ret.taskId = ret._id.toString();

			delete ret._id;
			delete ret.__v;
		},
	},
})
export class Task extends CommonSchemaProps {
	@Prop({ required: true })
	title: string;

	@Prop()
	description: string;

	@Prop({ required: true })
	isComplete: boolean;

	@Prop({ required: true })
	deadline: Date;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "List" })
	list: List;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Board" })
	board: Board;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	owner: User;
}

export type TaskDocument = Task & Document;
const TaskSchema = SchemaFactory.createForClass(Task);

export default TaskSchema;
