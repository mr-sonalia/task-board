/** @format */

import { model, Schema, Types } from "mongoose";

const BlogsSchema = new Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
	date: Date,
	user_id: { type: Types.ObjectId, ref: "" },
});

BlogsSchema.set("toJSON", {
	transform(doc, ret) {
		ret.id = ret._id.toString();

		delete ret._id;
		delete ret.__v;
	},
});

const Blogs = model("blog", BlogsSchema);

export default Blogs;
