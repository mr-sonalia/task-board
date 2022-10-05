import { Types } from "mongoose";

export class CreateTaskListDTO {
	user: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	tasks: Types.ObjectId[];
}
