import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "types/types";

type BookList = {
  books: Book[];
  isLoading: boolean;
  favorite: Book[];
  fetchedBooks:Book[];
};

const initialState: BookList = {
  books: [],
  isLoading: true,
  favorite: [],
  fetchedBooks:[]
};

const bookSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    getBooksData: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.fetchedBooks= action.payload;
      state.isLoading = false;
    },
    addFavoriteBook: (state, action: PayloadAction<Book>): void => {
      const isInFavorite = state.favorite.some(
        (book) => book._id === action.payload._id
      );

      if (!isInFavorite) {
        state.favorite = [...state.favorite, action.payload];
      } else {
        state.favorite = [...state.favorite];
      }
    },
    removeFavoriteBook: (state, action: PayloadAction<Book>): void => {
      const remainingAfterDelete = state.favorite.filter(
        (book) => book._id !== action.payload._id
      );
      state.favorite = remainingAfterDelete;
    },
    sorting: (state, action: PayloadAction<string>) => {
      if (action.payload === "lowestPrice") {
        state.books.sort((a, b) => a.price - b.price);
      }
      if (action.payload === "highestPrice") {
        state.books.sort((a, b) => b.price - a.price);
      }
      if (action.payload === "AZ") {
        state.books.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (action.payload === "ZA") {
        state.books.sort((a, b) => b.title.localeCompare(a.title));
      }
      if (action.payload === "reset") {
        state.books=state.fetchedBooks
      }
    },
  },
});

    // handleFavoriteBook: (state, action: PayloadAction<Book>): void => {
    //   const isInFavorite = state.favorite.some(
    //     (book) => book._id === action.payload._id
    //   );

    //   if (!isInFavorite) {
    //     state.favorite = [...state.favorite, action.payload];
    //   } else {
    //     const remainingAfterDelete = state.favorite.filter(
    //       (book) => book._id !== action.payload._id
    //     );
    //     state.favorite = remainingAfterDelete;
    //   }
     
    // },
   

export const bookActions = bookSlice.actions;
const bookReducer = bookSlice.reducer;
export default bookReducer;
