import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./slices/books";
import bookDetailReducer from "./slices/bookDetails";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    bookDetail: bookDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;