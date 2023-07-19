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
  role:string
};
export enum Gender {
  male = "male",
  female = "female",
  others = "others",
  none = "none",
}

export enum Role {
  user = "user",
  admin = "admin",
}
const UserSchema = new mongoose.Schema({
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
    required: true,
    maxLength: 200,
  },

  userName: {
    type: String,
    required: true,
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
});
// for later
UserSchema.pre("save", function (next) {
  // do stuff
  next();
});
export default mongoose.model<UserDocument>("User", UserSchema);
