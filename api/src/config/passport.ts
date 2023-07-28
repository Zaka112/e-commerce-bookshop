import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

import { findUserByEmailService } from "../services/users";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const jwtStrategy = new JwtStrategy( //1. option 2. call back
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const email = payload.email;
    const foundUser = await findUserByEmailService(email);
    done(null, foundUser);
    // authorization done and allowed to go to updateuserinfocontroller
  }
);
