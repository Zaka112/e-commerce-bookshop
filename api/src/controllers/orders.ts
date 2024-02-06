import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import Order from "../models/Order";
import {
  createNewOrderService,
  findOrderByOrderIdService,
  findOrderByUserIdService,
} from "../services/orders";

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

export const createNewOrderController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const newOrder = request.body;
    const { bookList, totalOrderPrice, firstName } = request.body;
    const order = new Order({
      userId: request.params.userId,
      firstName,
      bookList,
      totalOrderPrice,
    });

    const lineItems = newOrder.bookList.map((orderedItem: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: orderedItem.title,
        },
        unit_amount: Math.round(newOrder.totalOrderPrice * 100),
      },
      quantity: orderedItem.counter,
    }));

    const session = await stripe.checkout.sessions.create({
      currency: "usd",

      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/orders/success`,
      cancel_url: `http://localhost:3000/cancel.tsx`,
    });

    response.json({ id: session.id });
    
    // const newCreatedOrder = await createNewOrderService(order);
    //should not send again
    // response.status(201).json(newCreatedOrder);
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
