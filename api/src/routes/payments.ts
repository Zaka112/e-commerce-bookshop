import { Router } from "express";

import { createPaymentcontroller } from "../controllers/payments";
import passport from "passport";

const router = Router();

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/:userId",  createPaymentcontroller);
//passport.authenticate("jwt", { session: false }),
export default router;

