import { orderActions } from "../slices/orders";
import { AppDispatch } from "../store";
import { Order } from "../../types/types";
import { BASE_URL } from "../../api";

export function getUserOrderList(userId: string) {
  const token = localStorage.getItem("userToken");
  const orderUrl = `${BASE_URL}/orders/${userId}`;

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
  const orderDetailsUrl = `${BASE_URL}/orders/orderdetails/${orderId}`;
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
