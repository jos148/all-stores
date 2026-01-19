import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  role: "admin" | "user";
  emailVerified: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Proper default export (VERY IMPORTANT)
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
