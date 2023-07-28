import { NextFunction, Request, Response } from "express";

import Order from "../models/Order";
import {
  createNewOrderService,
  findOrderByOrderIdService,
  findOrderByUserIdService,
} from "../services/orders";

export const createNewOrderController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { bookList, totalOrderPrice } = request.body;
    const order = new Order({
      userId: request.params.userId,
      bookList,
      totalOrderPrice,
    });

    const newOrder = await createNewOrderService(order);
    response.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
export const findOrderByUserIdController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.userId;
    const orderList = await findOrderByUserIdService(userId);
    response.status(200).json(orderList);
  } catch (error) {
    next(error);
  }
};

export const findOrderByOrderIdController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const orderId = request.params.orderId;
    const orderById = await findOrderByOrderIdService(orderId);
    response.status(200).json(orderById);
  } catch (error) {
    next(error);
  }
};
