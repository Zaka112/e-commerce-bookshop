import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "../../types/types";

export type bookDetail = { book: null | Book[]; isLoading: boolean };

export const initialState: bookDetail = {
  book: null,
  isLoading: true,
};

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    getBookDetail: (state, action: PayloadAction<Book[]>) => {
      state.book = action.payload;
      state.isLoading = false;
    },
  },
});

export const bookDetailActions = bookDetailSlice.actions;
const bookDetailReducer = bookDetailSlice.reducer;
export default bookDetailReducer;