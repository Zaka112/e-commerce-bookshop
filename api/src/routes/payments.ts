import { Router } from "express";

import {
 // createPaymentcontroller,
  getPublishableKey,
} from "../controllers/payments";
import passport from "passport";
import { handleStripeWebhook } from "../controllers/orders";

const router = Router();

router.get(
  "/config",
  passport.authenticate("jwt", { session: false }),
  getPublishableKey
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  handleStripeWebhook
);
//router.post("/",  createPaymentcontroller);

export default router;
