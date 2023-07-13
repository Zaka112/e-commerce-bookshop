import { bookActions } from "../slices/books";
import { AppDispatch } from "../store";
import { bookDetailActions } from "../slices/bookDetails";
import { Book } from "../../types/types";

const booksURL = "http://localhost:5001/books";

export function getBooksData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(booksURL);
    const fetchedBooks:Book[] = await response.json();
      dispatch(bookActions.getBooksData(fetchedBooks));
  };
}

export function getBookDetailData(bookDetailURL: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(bookDetailURL);
    
    const fetchedBookDetail:Book = await response.json();
    
    dispatch(bookDetailActions.getBookDetail(fetchedBookDetail));
  };
}