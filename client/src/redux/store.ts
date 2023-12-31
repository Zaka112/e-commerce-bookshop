import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./slices/books";
import bookDetailReducer from "./slices/bookDetails";
import searchReducer from "./slices/search";
import userReducer from "./slices/user";
import cartReducer from "./slices/cart";
import orderReducer from "./slices/orders";
import themeReducer from "./slices/theme";
import usersReducer from "./slices/users";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    bookDetail: bookDetailReducer,
    cartList: cartReducer,
    search: searchReducer,
    user: userReducer,
    userList: usersReducer,
    orders: orderReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
