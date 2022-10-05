import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Task {
	@Prop({ required: true })
	title: string;

	@Prop()
	description: string;

	@Prop({ required: true })
	isComplete: boolean;

	@Prop()
	createdAt: Date;

	@Prop()
	UpdatedAt: Date;

	@Prop()
	deadline: Date;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
