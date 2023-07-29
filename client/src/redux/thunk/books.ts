import { bookActions } from "../slices/books";
import { AppDispatch } from "../store";
import { bookDetailActions } from "../slices/bookDetails";
import { Book } from "../../types/types";
import { BASE_URL } from "../../api";

const booksURL = `${BASE_URL}/books`;

export function getBookList() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(booksURL);
    const fetchedBooks = await response.json();
    dispatch(bookActions.getBooksData(fetchedBooks));
  };
}

export function getBookDetailData(bookDetailURL: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(bookDetailURL);
    const fetchedBookDetail: Book = await response.json();
    dispatch(bookDetailActions.getBookDetail(fetchedBookDetail));
  };
}
