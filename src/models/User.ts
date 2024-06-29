import {model, models, Schema} from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface UserType extends Document {
    id: string;
    name: string;
    email?: string; // Optional email property
    avatar?: string; // Optional avatar property
    bio?: string; // Optional bio property
    password: string;
    postCount: number;
    role: Role;
}

export const UserSchema = new Schema<UserType>(
    {
        name: {type: String, required: true},
        email: String,
        avatar: String,
        bio: String,
        password: String,
        postCount: Number,
        role: {
            type: String,
            enum: Role,
        },
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);

export const User = models.User || model("User", UserSchema);
// export const User = model("User", UserSchema);
// export default User;
