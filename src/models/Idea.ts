import mongoose, {Schema} from "mongoose";
import {User} from "./User";
import {CustomFieldType} from "./CustomField";

export enum IdeaStatus {
    OPEN = "OPEN",
    CLOSE = "CLOSE",
    REOPEN = "REOPEN",
    NONE_EXECUTABLE = "NONE_EXECUTABLE",
}

export interface IdeaType extends Document {
    id: string;
    title: string;
    description?: string; // Optional description property
    raters: mongoose.Schema.Types.ObjectId[]; // Array of rater ObjectIds
    rates: any; // Placeholder for rates (type unknown)
    ratingsAverage: number;
    status: IdeaStatus;
    lists: any; // Placeholder for lists (type unknown)
    author: mongoose.Schema.Types.ObjectId; // Reference to User model
    upsides: string[];
    downsides: string[];
    problems: string[];
    solutions: string[];
    alternatives: string[];
    targetAudience: string[];
    tags: string[];
    createdAt: Date; // Added due to timestamps
    updatedAt: Date; // Added due to timestamps
    comments?: Comment[]; // Virtual for comments (optional)
    customField?: CustomFieldType[]; // Virtual for custom fields (optional)
    ratingsQuantity?: number; // Virtual for ratings quantity (optional)
}

export const IdeaSchema = new Schema<IdeaType>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        raters: [Schema.Types.ObjectId],
        rates: Schema.Types.Mixed,
        ratingsAverage: Number,
        status: {
            type: String,
            enum: Object.keys(IdeaStatus),
        },
        lists: Schema.Types.Mixed,
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        upsides: [],
        downsides: [],
        problems: [],
        solutions: [],
        alternatives: [String],
        targetAudience: [String],
        tags: [String],
    },
    {
        toJSON: {virtuals: true}, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: {virtuals: true}, // So `console.log()` and other functions that use `toObject()` include virtuals
    }
);

IdeaSchema.set("timestamps", true);

// IdeaSchema.virtual("comments", {
//     ref: "Comment",
//     localField: "_id",
//     foreignField: "idea",
// });
// IdeaSchema.virtual("customField", {
//     ref: "CustomField",
//     localField: "_id",
//     foreignField: "idea",
// });

IdeaSchema.virtual("ratingsQuantity").get(function () {
    return this.raters?.length || 0;
});

IdeaSchema.statics.calcPostCount = async function (userId: mongoose.Types.ObjectId) {
    const userPosts = await this.aggregate([
        {
            $match: {author: userId},
        },
        {
            $count: "postCount",
        },
    ]);

    try {
        const t = await User.findByIdAndUpdate(
            userId,
            {
                postCount: userPosts[0].postCount,
            },
            {new: true}
        );
    } catch (e) {
        console.log(e);
    }
};
//
// IdeaSchema.statics.markAsRead = async function (author) {
//     try {
//
//         // if(idea.author.equals(content.author)) {
//             await Notification.create({
//                 type: notificationTypes.RATE.value,
//                 // content: content,
//                 user: author,
//             });
//         // } else {
//         //     console.log("Same user");
//         // }
//     } catch (e) {
//         console.log(e);
//     }
// };
// IdeaSchema.post("save", async function (this: Model<IdeaType> & IdeaType) {
//     await this.constructor.calcPostCount(this.author);
// });
// IdeaSchema.post("save", function () {
// 	this.constructor.calcPostCount(this.author);
// });

// IdeaSchema.pre("deleteOne", async function (this: Model<IdeaType> & IdeaType) {
//     // console.log('delete', this)
//     await this.constructor.calcPostCount(this.author);
// });

const Idea = mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);
export default Idea;
