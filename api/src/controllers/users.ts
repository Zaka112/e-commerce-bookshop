import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User";
import {
  createUserService,
  findUserByEmailService,
  getUserByIdService,
  updateUserByIdService,
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
    role,
  } = request.body;
  // can add validation logic to check fields are not empty
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
      role,
    });

    const newUser = await createUserService(userInformation);

    response.status(201).json(newUser);
  } catch (error) {
    next(error);
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

//put: update a user
export const updateUserInfoController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.params.id;
    const updatedInformation = request.body;
    const updatedUser = await updateUserByIdService(userId, updatedInformation);

    response.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
