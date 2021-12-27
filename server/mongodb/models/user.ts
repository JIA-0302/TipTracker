import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  timezone?: string;
  email_verified?: boolean;
  image?: string;
  password_hash: string;
}

export type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
});

export const User =
  mongoose.models.users ??
  mongoose.model<IUser, UserModel>("users", UserSchema);
