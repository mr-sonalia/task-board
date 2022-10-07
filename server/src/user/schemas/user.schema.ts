import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Board } from "src/board/schemas/board.schema";
import { CommonSchemaProps } from "src/common/schemas/common.schema";
import { IUserName } from "../interfaces/user.interface";

@Schema({
	toJSON: {
		transform(doc, ret) {
			ret.userId = ret._id.toString();

			delete ret._id;
			delete ret.__v;
		},
	},
})
export class User extends CommonSchemaProps {
	@Prop(
		raw({
			first: { type: String },
			middle: { type: String },
			last: { type: String },
		}),
	)
	name: IUserName;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	mobile: number;

	@Prop()
	token: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }] })
	boards: Board[];
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);

export default UserSchema;
