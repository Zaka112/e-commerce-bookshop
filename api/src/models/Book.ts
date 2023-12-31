import mongoose, { Document } from "mongoose";

export type BookDocument = Document & {
  isbn: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  categories: string[];
  quantity: number;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  onSalse: boolean;
  mostSold: boolean;
  newAddition: boolean;
};

export const BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
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
  categories: {
    type: Array,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },

  publisher: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  mostSold: {
    type: Boolean,
    default: false,
  },
  newAddition: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<BookDocument>("Book", BookSchema);
