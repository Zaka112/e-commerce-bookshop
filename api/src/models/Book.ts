import mongoose, { Document } from "mongoose";

export type BookDocument = Document & {
  publishingNumber: string;
  publisher:string,
  title: string;
  price: number;
  images: string [];
  category: string[];
  quantity: number;
  author: string[];
  // loanDate:Date,
  // returnDate:Date,
 // lender:string,
  publishedDate: Date,
  
};
export enum Status {
  available = "available",
  notAvailable = "not available",
}

export const BookSchema = new mongoose.Schema({
  publishingNumber: {
    type: String,
    required: true,
    unique:true
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  category: { type: Array, required: true },
  quantity: {
    type: Number,
    required: true,
  },
  author: {
    type: Array,
    required: true,
  },
  // loanDate: {
  //   type: Date,
  //   required:true,
  //   default:Date.now
  // }, only when lending
  // returnDate: {
  //   type: String, 
  //   required:true,
  //   default:Date.now
  // }, only when return
  // lender: {
  //   type: String,
  // },
  status: {
    type: String,
    enum: Status,
    default: Status.available,
    required: true,
  },
  publishedDate: {
    type:Date,
    required: true,
  },
  
});

export default mongoose.model<BookDocument>("Book", BookSchema);
