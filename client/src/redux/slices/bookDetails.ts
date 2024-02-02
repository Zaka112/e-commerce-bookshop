import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Book } from "types/types";

export type bookDetail = { book: null | Book; isLoading: boolean; publishableKey: string };

export const initialState: bookDetail = {
  book: null,
  isLoading: true,
  publishableKey: ""
};

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    getBookDetail: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
      state.isLoading = false;
    },
    getPayment: (state, action: PayloadAction<string>) => {
      state.publishableKey = action.payload;
      
    },
  },
});

export const bookDetailActions = bookDetailSlice.actions;
const bookDetailReducer = bookDetailSlice.reducer;
export default bookDetailReducer;
