import { Router } from "express";
import passport from "passport";

import {
  createNewOrderController,
  findOrderByOrderIdController,
  findOrderByUserIdController,
} from "../controllers/orders";

import roleCheck from "../middlewares/roleCheck";

const router = Router();

router.post(
  "/:userId",
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
export default router;
