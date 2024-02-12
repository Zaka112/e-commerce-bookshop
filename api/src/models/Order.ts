import mongoose, { Document } from "mongoose";

import { BookDocument, BookSchema } from "./Book";

export type BookOrder = BookDocument & {
  counter: number;
};

const BookOrderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  counter: {
    type: Number,
    reqired: true,
  },
});
export enum Status {
  pending = "pending",
  paid = "paid",
}
export type OrderDocument = Document & {
  userId: string;
  firstName:string;
  bookList: BookDocument[];
  orderedAt: Date;
  status: Status;
};

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: mongoose.Schema.Types.String, ref: "User" },
  bookList: [BookOrderSchema],
  orderedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
   
  },
  totalOrderPrice: {
    type: Number,
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
