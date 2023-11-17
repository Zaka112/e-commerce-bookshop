import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  gender: string;
  country: string;
  interests: string;
  createdAt: Date;
  role: string;
  isBanned: boolean;
  lastLogin:Date;
  avatar: string;
};
export enum Gender {
  male = "male",
  female = "female",
  other = "other",
  none = "none",
}

export enum Role {
  user = "user",
  admin = "admin",
}
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100,
    },

    password: {
      type: String,
      maxLength: 200,
    },

    userName: {
      type: String,
      unique: true,
      maxLength: 50,
    },

    gender: {
      type: String,
      enum: Gender,
      default: Gender.none,
    },

    country: {
      type: String,
      maxLength: 300,
    },

    interests: {
      type: String,
      maxLength: 200,
    },

    role: {
      type: String,
      enum: Role,
      default: Role.user,
      required: true,
    },
    isBanned: { 
      type: Boolean, 
      default: false 
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    avatar: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);
// for later
UserSchema.pre("save", function (next) {
  // do stuff
  next();
});
export default mongoose.model<UserDocument>("User", UserSchema);
