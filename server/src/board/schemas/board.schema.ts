import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { CommonSchemaProps } from "src/common/schemas/common.schema";
import { List } from "src/list/schemas/list.schema";
import { User } from "src/user/schemas/user.schema";

@Schema({
	toJSON: {
		transform(doc, ret) {
			ret.boardId = ret._id.toString();

			delete ret._id;
			delete ret.__v;
		},
	},
})
export class Board extends CommonSchemaProps {
	@Prop({ required: true })
	title: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	owner: User;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }] })
	lists: List[];
}

export type BoardDocument = Board & Document;
const BoardSchema = SchemaFactory.createForClass(Board);

export default BoardSchema;
