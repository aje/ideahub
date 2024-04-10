import mongoose, {Schema, Document} from "mongoose";
export interface CustomFieldType extends Document {
	title: string;
	idea: mongoose.Schema.Types.ObjectId; // Reference to Idea model (type safety)
	items: any[]; // Placeholder for items (type unknown)
	createdAt: Date; // Added due to timestamps
	updatedAt: Date; // Added due to timestamps
}

export const CustomFieldSchema = new Schema<CustomFieldType>({
	title: {
		type: String,
		required: [true, "Title cannot be empty!"],
	},
	idea: {
		type: Schema.Types.ObjectId,
		ref: "Idea",
		required: [true, "Custom field must belong to a post"],
	},
	items: [],
});

CustomFieldSchema.set("timestamps", true);

export const CustomField = mongoose.models.CustomField || mongoose.model("CustomField", CustomFieldSchema);
// export default CustomField;
