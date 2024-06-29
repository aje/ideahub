import mongoose, {Document, Schema} from "mongoose";
import Idea from "./Idea";
import {Notification, NotifTypes} from "./Notification";

export interface CommentType extends Document {
    description: string;
    author: mongoose.Schema.Types.ObjectId;
    idea: mongoose.Schema.Types.ObjectId;
    replies: CommentType[];
}

export const CommentSchema = new Schema<CommentType>({
    description: {
        type: String,
        required: [true, "Comment cannot be empty!"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Comment must have an author"],
    },
    idea: {
        type: Schema.Types.ObjectId,
        ref: "Idea",
        required: [true, "Comment must belong to a post"],
    },
    replies: {type: [Schema.Types.ObjectId], ref: "Comment"},
});

CommentSchema.set("timestamps", true);

CommentSchema.statics.notifAuthor = async function (ideaId, content) {
    try {
        const idea = await Idea.findById(ideaId);
        if (!idea.author.equals(content.author)) {
            await Notification.create({
                type: NotifTypes.COMMENT,
                content: content,
                user: idea.author,
            });
        } else {
            // console.log("Same user");
        }
    } catch (e) {
        // console.log(e);
    }
};

CommentSchema.post("save", function () {
    this.constructor.notifAuthor(this.idea, this);
});

export const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
