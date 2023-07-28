import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "../../types/types";

type BookList = {
  books: Book[];
  isLoading: boolean;
  favorite: Book[];
};

const initialState: BookList = {
  books: [],
  isLoading: true,
  favorite: [],
};

const bookSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    getBooksData: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
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
  },
});

export const bookActions = bookSlice.actions;
const bookReducer = bookSlice.reducer;
export default bookReducer;
