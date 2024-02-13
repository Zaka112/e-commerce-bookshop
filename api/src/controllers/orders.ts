import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Stripe } from 'stripe';

import Order from "../models/Order";
import {
  createNewOrderService,
  findOrderByOrderIdService,
  findOrderByUserIdService,
} from "../services/orders";
import { BASE_URL } from "../api";

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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
      status:'pending'
    });
    const newCreatedOrder = await createNewOrderService(order);
    const lineItems = newOrder.bookList.map((orderedItem: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: orderedItem.title,
        },
        unit_amount: orderedItem.price * 100,
      },
      quantity: orderedItem.counter,
    }));

    const session = await stripe.checkout.sessions.create({
      currency: "usd",

      line_items: lineItems,
      mode: "payment",
      success_url: `${BASE_URL}/cart`,
      cancel_url: `${BASE_URL}/error`,
    });
    const orderId = session.metadata?.orderId;
    
    response.json({ id: session.id });

     //const newCreatedOrder = await createNewOrderService(order);
    //should not send again
   // response.status(201).json(newCreatedOrder);
  } catch (error) {
    next(error);
  }
};
///////////////
export const handleStripeWebhook = async (request: Request, response: Response) => {
  const sig = request.headers['stripe-signature'];
  type StripeEvent = Stripe.Event;
  let event: StripeEvent;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, webhookSecret);
  } catch (err) {
    console.error('Error verifying webhook signature:', );
    return response.status(400).send(`Webhook Error: `);
  }

  // Handle the event type
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const orderId = session.metadata?.orderId;
      console.log(orderId)
      // Update order status to 'paid' in  database
      await Order.findByIdAndUpdate(orderId, { status: 'paid' });

      console.log(`Order ${orderId} has been paid.`);
      break;
    // Handle other event types if needed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  response.status(200).send('Webhook Received');
};
//////////



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
