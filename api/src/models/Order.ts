import mongoose, { Document } from "mongoose";

import { BookDocument, BookSchema } from "./Book";

export type OrderDocument = Document & {
  userId: string;
  bookList: BookDocument[];
  orderedAt: Date;
};

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookList: [BookSchema],
  orderedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
