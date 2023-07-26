import { Router } from "express";
import passport from "passport";

import {
  createUser,
  logInController,
  getUserById,
  updateUserInfoController,
} from "../controllers/users";

const router = Router();
//register
router.post("/register", createUser);
//login
router.post("/signin", logInController);

//update user info
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserInfoController
);
router.get("/:id",passport.authenticate("jwt", { session: false }), getUserById);

export default router;
