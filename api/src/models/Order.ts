import mongoose, { Document } from "mongoose";

import { BookDocument, BookSchema } from "./Book";

export type OrderDocument = Document & {
  userId: string;
  bookList: BookDocument[];
  lendedAt: Date;
};

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookList: [BookSchema],
  lendedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
