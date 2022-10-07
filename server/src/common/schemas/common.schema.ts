import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class CommonSchemaProps {
    @Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;
}