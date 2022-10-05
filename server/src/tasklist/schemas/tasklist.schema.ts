import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class TaskList {
	@Prop({ type: Types.ObjectId, ref: "User" })
	user: Types.ObjectId;

	@Prop({ required: true })
	creationDate: Date;

	@Prop({ required: true })
	title: string;

	@Prop([{ type: Types.ObjectId, ref: "Task" }])
	tasks: string[];
}

const TaskListSchema = SchemaFactory.createForClass(TaskList);

TaskListSchema.set("toJSON", {
	transform(doc, ret) {
		ret.listId = ret._id.toString();

		delete ret._id;
		delete ret.__v;
	},
});
export type TaskListDocument = TaskList & Document;
export default TaskListSchema;
