import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import GoogleTokenStrategy from "passport-google-id-token";

import { findOrCreateUserService, findUserByEmailService } from "../services/users";

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

const clientId = process.env.GOOGLE_CLIENT_ID as string
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string
export const googleStrategy = new GoogleTokenStrategy(
  {
    clientID: clientId,

  },
  async (parsedToken: any, googleId: string, done: any) => {
    try {
      const userPayload = {
        firstName: parsedToken?.payload?.given_name,
        lastName: parsedToken?.payload?.family_name,
        userName: parsedToken?.payload?.displayName,
        email: parsedToken?.payload?.email,
        avatar: parsedToken?.payload?.avatar,
      };

      // if the user doesn't exist, create a new user
      const foundUser = await findOrCreateUserService(userPayload);

      return done(null, foundUser);
    } catch (error) {
      console.error("Google Strategy Error", error);
      done(error, false);
    }
  }
);
