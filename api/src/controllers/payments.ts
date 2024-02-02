

import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

export const createPaymentcontroller = async (req: Request, res: Response) => {
    const { products } = req.body;
  
    console.log(products, "products");
    try {
      const lineItems = products.bookList.map((product: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
          },
          unit_amount: Math.round(products.totalOrderPrice * 100) ,
        },
        quantity: product.counter,
      }));
      console.log(lineItems, "lineItems")
      const session = await stripe.checkout.sessions.create({
        currency: "usd",
       // automatic_payment_methods: { enabled: true },
        line_items: lineItems,
        mode: "payment",
        success_url: ``,
        cancel_url: ``,
      });
  console.log(session.id)
      res.json({ id: session.id });
    } catch (error) {
      console.log(error);
    }
  }

