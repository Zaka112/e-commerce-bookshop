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

export type OrderDocument = Document & {
  userId: string;
  bookList: BookDocument[];
  orderedAt: Date;
};

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookList: [BookOrderSchema],
  orderedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  totalOrderPrice: {
    type: Number,
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
