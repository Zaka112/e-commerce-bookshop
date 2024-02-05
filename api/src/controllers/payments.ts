import { Request, Response } from "express";
import dotenv from "dotenv";


dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

export const createPaymentcontroller = async (req: Request, res: Response) => {
  const newOrder = req.body;

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
      success_url: `http://localhost:3000/success.tsx`,
      cancel_url: `http://localhost:3000/cancel.tsx`,
    });
    
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
};
