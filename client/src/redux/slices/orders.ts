import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Order } from "../../types/types";

type InitialState = {
  userOrders: Order[];
  userOrderDetails: Order | null;
};

const initialState: InitialState = {
  userOrders: [],
  userOrderDetails: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getUserOrders: (state, action: PayloadAction<Order[]>) => {
      state.userOrders = action.payload;
    },
    getOrderDetails: (state, action: PayloadAction<Order>) => {
      state.userOrderDetails = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
