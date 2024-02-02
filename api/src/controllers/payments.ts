import { Request, Response } from "express";
import dotenv from "dotenv";
import { BASE_URL } from "../api";

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

export const createPaymentcontroller = async (req: Request, res: Response) => {
  const newOrder = req.body;
console.log(newOrder)
  try {
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
      // automatic_payment_methods: { enabled: true },
      line_items: lineItems,
      mode: "payment",
      success_url: `${BASE_URL}/success.tsx`,
      cancel_url: `${BASE_URL}/cancel.tsx`,
    });
    console.log(session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
};
