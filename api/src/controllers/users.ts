import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User";
import {
  createUserService,
  findUserByEmailService,
  getUserByIdService,
  updateUserByIdService,
} from "../services/users";

//post: Create a new user
export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      userName,
      age,
      gender,
      country,
      phone,
      interests,
      role,
    } = request.body;
    const userInformation = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userName: userName,
      age: age,
      gender: gender,
      country: country,
      phone: phone,
      interests: interests,
      role: role,
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
  try {
    const userdata = await findUserByEmailService(request.body.email);
    if (!userdata) {
      return response
        .status(403)
        .json({ message: "user do not have account yet" });
    }

    //1. pay load
    //2. jwt Secerts
    //3 expiry time
    const token = jwt.sign(
      {
        email: userdata.email,
        _id: userdata._id,
        firstName: userdata.firstName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    response.json({ userdata, token });
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

    response.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
