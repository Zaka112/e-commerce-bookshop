import { NextFunction, Request, Response } from "express";

import Order from "../models/Order";
import { addNewOrderService } from "../services/orders";

export const addNewOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.userId;
    const newOrder = new Order({
      userId: userId,
      bookList: request.body.bookList,
    });

    const addedOrder = await addNewOrderService(newOrder);

    response.status(201).json(addedOrder);
  } catch (error) {
    next(error);
  }
};
