import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User, { UserDocument } from "../models/User";
import {
  createUserService,
  findUserByEmailService,
  getUserByIdService,
  updateUserByIdService,
  toggleRoleService,
  getUserListService,
} from "../services/users";
import { UnauthorizedError } from "../helpers/apiError";

//post: Create a new user
export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    firstName,
    lastName,
    userName,
    gender,
    country,
    interests,
  } = request.body;
  // can add validation logic to check fields are not empty
  if (password!== "" ) {
  try {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInformation = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      userName,
      gender,
      country,
      interests,
    });

    const newUser = await createUserService(userInformation);

    response.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
} else {
  response.status(500).send("Password required");
}
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

//post: login user
export const logInController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;
  try {
    const userData = await findUserByEmailService(email.toLowerCase());

    if (!userData) {
      return response.status(403).json({ message: "Invalid credentials" });
    }
    //check for password before generating the token
    const hashedPassword = userData.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError();
    }
    //1. pay load
    //2. jwt Secerts
    //3 expiry time
    const token = jwt.sign(
      {
        email: userData.email,
        _id: userData._id,
        firstName: userData.firstName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    response.json({ userData, token });
  } catch (error) {
    next(error);
  }
};

//get: get single user
export const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.id;
    const userById = await getUserByIdService(userId);

    response.status(200).json(userById);
  } catch (error) {
    next(error);
  }
};

//get: get all users
export const getUserListController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userById = await getUserListService();

    response.status(200).json(userById);
  } catch (error) {
    next(error);
  }
};

//put: update a user
export const updateUserInfoController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { firstName, lastName, gender, country, interests } = request.body;
  if (firstName!=="" && lastName!=="") {
    try {
      const userId = request.params.id;
      const updatedInformation = {
        firstName,
        lastName,
        gender,
        country,
        interests,
      };
      const updatedUser = await updateUserByIdService(userId, updatedInformation);

      response.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
  else {
    response.send("Please fill the required fields")
  }
   
};
// put: toogle the role
export const toggleRoleController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.userId;

    const updatedUser = await toggleRoleService(userId);

    response.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// google
export const googleAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.user as UserDocument;
    const token = jwt.sign(
      {
        email: userData.email,
        _id: userData._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    if (!userData) {
      res.json({ message: "can't find user with this email" });
      return;
    } else {
      res.json({ token, userData });
    }
   // await updateLastLoginService(userData._id);
  } catch (error) {
    next(error);
  }
};
