import { Router } from "express";

import { createPaymentcontroller } from "../controllers/payments";

const router = Router();

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/", createPaymentcontroller);

export default router;

