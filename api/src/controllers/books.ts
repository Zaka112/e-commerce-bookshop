import { NextFunction, Request, Response } from "express";

import Book from "../models/Book";
import {
  addNewBookService,
  getBookByIdService,
  getBookListService,
} from "../services/books";

export const addNewBook = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      isbn,
      price,
      publisher,
      images,
      categories,
      quantity,
      authors,
      description,
      publishedDate,
      onSale,
      mostSold,
      newAddition,
    } = request.body;
    const bookInformation = new Book({
      title,
      isbn,
      price,
      publisher,
      images,
      categories,
      quantity,
      authors,
      description,
      publishedDate,
      onSale,
      mostSold,
      newAddition,
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
    const bookById = await getBookByIdService(bookId);

    response.status(200).json(bookById);
  } catch (error) {
    next(error);
  }
};
