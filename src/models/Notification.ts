import mongoose, {Schema, Document, models, model} from "mongoose";


export enum NotificationType {
	COMMENT = "COMMENT",
	REPLY = "REPLY",
	RATE = "RATE",
}

export interface Notification extends Document {
	type: NotificationType;
	content: any; // Placeholder for content (type unknown)
	user: mongoose.Schema.Types.ObjectId; // Reference to User model
	seen: boolean;
	createdAt: Date;
}
// export const notificationTypes = {
// 	COMMENT: {value: "COMMENT"},
// 	REPLY: {value: "REPLY"},
// 	RATE: {value: "RATE"},
// };

export const NotificationSchema = new Schema<Notification>(
	{
		type: {
			type: String,
			enum: Object.keys(NotificationType),
		},
		content: Schema.Types.Mixed,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		seen: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {virtuals: true}, // So `res.json()` and other `JSON.stringify()` functions include virtuals
		toObject: {virtuals: true}, // So `console.log()` and other functions that use `toObject()` include virtuals
	}
);

export const Notification = models.Notification || model("Notification", NotificationSchema);
// export default Notification;
