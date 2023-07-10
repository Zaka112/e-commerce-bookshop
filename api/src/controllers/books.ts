import { NextFunction, Request, Response } from "express";

import Book from "../models/Book";

import {
  addNewBookService,
  deleteBookByIdService,
  getBookByIdService,
  getBookListService,
  updateBookInformationService,
} from "../services/books";

export const addNewBook = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try { const {
    title,
    price,
    publisher,
    publishingNumber,
    images,
    category,
    quantity,
    author,
    loanDate,
    returnDate,
    lender,
    publishedDate,
    status,
  } = request.body;
  const bookInformation = new Book({
    title: title,
    price: price,
    publisher: publisher,
    publishingNumber: publishingNumber,
    images: images,
    category: category,
    quantity: quantity,
    author: author,
    loanDate: loanDate,
    returnDate: returnDate,
    lender: lender,
    publishedDate: publishedDate,
    status: status,
  });

    const addedBook = await addNewBookService(bookInformation);

    response.status(201).json(addedBook);
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const bookList = await getBookListService();

    response.status(200).json(bookList);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const bookId = request.params.id;
    const bookById= await getBookByIdService(bookId);

    response.status(200).json(bookById);
  } catch (error) {
    next(error);
  }
};

export const deleteBookById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const bookId = request.params.id;
    await deleteBookByIdService(bookId);

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateBookInformation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const bookId = request.params.id;
    const updatedInformation = request.body;

    const updatedBook = await updateBookInformationService(
      bookId,
      updatedInformation
    );
    response.status(201).json(updatedBook);
  } catch (error) {
    next(error);
  }
};
