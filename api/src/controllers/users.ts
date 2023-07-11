import { NextFunction, Request, Response } from "express";

import User from "../models/User";
import {
  createUserService,
  deleteUserByIdService,
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
export const updateUserById = async (
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
//delete: delete a user
export const deleteUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userById = request.params.id;
    const userList = await deleteUserByIdService(userById);

    response.status(201).send();
  } catch (error) {
    next(error);
  }
};
