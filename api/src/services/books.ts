import { NotFoundError } from "../helpers/apiError";
import Book, { BookDocument } from "../models/Book";

export const addNewBookService = async (
  book: BookDocument
): Promise<BookDocument> => {
  return await book.save();
};

export const getBookListService = async (): Promise<BookDocument[]> => {
  return await Book.find();
};

export const getBookByIdService = async (
  bookId: string
): Promise<BookDocument> => {
  const bookById = await Book.findById(bookId);
  if (!bookById) {
    throw new NotFoundError(`No book found having ${bookId}`);
  }
  return bookById;
};
