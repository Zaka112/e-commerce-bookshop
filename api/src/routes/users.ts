import { Router } from "express";
import passport from "passport";

import {
  createUser,
  logInController,
  getUserById,
  updateUserInfoController,
  toggleRoleController,
  getUserListController,
  googleAuthenticate,
} from "../controllers/users";
import roleCheck from "../middlewares/roleCheck";

const router = Router();
//register
router.post("/register", createUser);
//login
router.post("/signin", logInController);

//google login
router.post(
  "/google-login",
  passport.authenticate("google-id-token", { session: false }),
  googleAuthenticate
);

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
// //get: get single user by Id - admin
// router.get(
//   "/:userId/user-details",
//   passport.authenticate("jwt", { session: false }),
//  roleCheck,
//   getUserListController
// );
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
