import axios from "axios";

import { orderActions } from "../slices/orders";
import { AppDispatch } from "../store";
import { Order } from "../../types/types";

export function getUserOrderList(userId: string) {
  const token = localStorage.getItem("userToken");
  const orderUrl = `http://localhost:5001/orders/${userId}`;

  return async (dispatch: AppDispatch) => {
    const response = await fetch(orderUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const orderList = await response.json();
    dispatch(orderActions.getUserOrders(orderList));
  };
}

export function getOrderDetails(orderId: string) {
  const token = localStorage.getItem("userToken");
  const orderDetailsUrl = `http://localhost:5001/orders/orderdetails/${orderId}`;
  return async (dispatch: AppDispatch) => {
    const response = await fetch(orderDetailsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedOrderDetails: Order = await response.json();
    dispatch(orderActions.getOrderDetails(fetchedOrderDetails));
  };
}
