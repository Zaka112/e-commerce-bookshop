import { Router } from "express";
import passport from "passport";

import {
  createNewOrderController,
  findOrderByOrderIdController,
  findOrderByUserIdController,
} from "../controllers/orders";

const router = Router();

router.post(
  "/secret/:userId",
  passport.authenticate("jwt", { session: false }),
  createNewOrderController
);

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  findOrderByUserIdController
);

router.get(
  "/orderdetails/:orderId",
  passport.authenticate("jwt", { session: false }),
  findOrderByOrderIdController
);
//// for payment 
router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

export default router;
