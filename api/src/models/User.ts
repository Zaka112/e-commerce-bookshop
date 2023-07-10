import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  age: number;
  gender: string;
  country: string;
  phone: number;
  interests: string;
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
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
   
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: Gender,
    default: Gender.none,
  },
  
  country: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  interests: {
    type: String,
  },
 
  role: {
    type: String,
    enum: Role,
    default: Role.user,
    required: true,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
