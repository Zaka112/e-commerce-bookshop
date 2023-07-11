import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "../../types/types";

type BookList = {
  books: Book[];
  isLoading: boolean;
};

const initialState: BookList = {
  books: [],
  isLoading: true,
};

const bookSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    getBooksData: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.isLoading = false;
    },
  },
});

export const bookActions = bookSlice.actions;
const bookReducer = bookSlice.reducer;
export default bookReducer;