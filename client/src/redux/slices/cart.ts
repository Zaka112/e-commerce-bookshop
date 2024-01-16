import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookOrder, Book } from "types/types";

type CartList = {
  cartItems: BookOrder[];
};

export const initialState: CartList = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>): void => {
      const isIncluded = state.cartItems.some(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (!isIncluded) {
        state.cartItems.push({ ...action.payload, counter: 1 });
      } else {
        alert("already in");
      } // Currently this logic would not be executed as have check in component. Will look for some alert thing later.
    },
    removeFromCart: (state, action: PayloadAction<Book>) => {
      const arrayAfterRemoving = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = arrayAfterRemoving;
    },

    increaseQuantity: (state, action: PayloadAction<BookOrder>) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].counter++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<BookOrder>) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].counter === 1) {
          state.cartItems[itemIndex].counter = 1;
        } else {
          state.cartItems[itemIndex].counter--;
        }
      }
    },
    emptyCart: (state) => {
      state.cartItems = initialState.cartItems;
    },
  },
});

export const cartListActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
