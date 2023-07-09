import mongoose, { Document } from "mongoose";

export type BookDocument = Document & {
  publishingNumber: string;
  publisher:string,
  title: string;
  price: number;
  images: string, //[];
  category: string[];
  quantity: number;
  author: string;
  loanDate:string, //Date,
  returnDate:string, //Date,
  lender:string,
  publishedDate: string, //Date,
  
};
export enum Status {
  available = "available",
  notAvailable = "not available",
}

const BookSchema = new mongoose.Schema({
  publishingNumber: {
    type: String,
    required: true,
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
    type: String, // Array,
    required: true,
  },
  category: { type: Array, required: true },
  quantity: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  loanDate: {
    type: String, // Date,
  },
  returnDate: {
    type: String, // Date,
  },
  lender: {
    type: String,
  },
  status: {
    type: String,
    enum: Status,
    default: Status.available,
    required: true,
  },
  publishedDate: {
    type:String,// Date,
    required: true,
  },
  
});

export default mongoose.model<BookDocument>("Book", BookSchema);
