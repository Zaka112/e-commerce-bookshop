import { NextFunction, Request, Response } from "express";

import User from "../models/User";
import { createUserService, getAllUserService } from "../services/users";

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

export const getAllUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userList = await getAllUserService();

    response.status(200).json(userList);
  } catch (error) {
    next(error);
  }
};
