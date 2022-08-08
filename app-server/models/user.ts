/** @format */

import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema({
	username: { type: String, required: true },
	name: {
		first: { type: String, required: true },
		middle: { type: String, required: false },
		last: { type: String, required: true }
	},
	email: { type: String, required: true },
	passwordHash: { type: String, required: true },
	task_list_ref: [{
		type: Types.ObjectId,
		ref: "tasklists",
		required: true
	}]
});

UserSchema.set("toJSON", {
	transform(doc, ret) {
		ret.id = ret._id.toString();

		delete ret._id;
		delete ret.__v;
	},
});

const User = model("users", UserSchema);

export default User;
