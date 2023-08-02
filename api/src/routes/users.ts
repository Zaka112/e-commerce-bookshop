import { Router } from "express";
import passport from "passport";

import {
  createUser,
  logInController,
  getUserById,
  updateUserInfoController,
  toggleRoleController,
  getUserListController,
} from "../controllers/users";
import roleCheck from "../middlewares/roleCheck";

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
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserById
);
//get: get all users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  roleCheck,
  getUserListController
);

router.put(
  "/:userId/toggle-role",
 passport.authenticate("jwt", { session: false }),
 roleCheck,
  toggleRoleController
);
export default router;
