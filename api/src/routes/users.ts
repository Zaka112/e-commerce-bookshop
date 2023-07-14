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
router.post("/login", logInController);

//update user info
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserInfoController
);
router.get("/:id", getUserById);

export default router;
