import { bookActions } from "../slices/books";
import { AppDispatch } from "../store";
import { bookDetailActions } from "../slices/bookDetails";
import { Book } from "types/types";
import { BASE_URL } from "api";
import { loadStripe } from "@stripe/stripe-js";

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

//////////test payment
export function getPublishableKey(): any {
  return async (dispatch: AppDispatch) => {
    const getPublishableKey = await fetch(`${BASE_URL}/secret/config`);
    const {publishableKey} = await getPublishableKey.json();
    dispatch(bookDetailActions.getPayment(publishableKey ));
    };
  };

