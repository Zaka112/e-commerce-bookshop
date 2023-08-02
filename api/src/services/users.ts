import { AlreadyExist, NotFoundError } from "../helpers/apiError";
import User, { UserDocument } from "./../models/User";

export const createUserService = async (
  user: UserDocument
): Promise<UserDocument> => {
  const alreadyExist = await User.findOne({ email: user.email });
  if (alreadyExist) {
    throw new AlreadyExist(`User with ${user.email} Already Exist`);
  } else return await user.save();
};

export const getUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  const userById = await User.findById(userId);
  if (!userById) {
    throw new NotFoundError(`No user found having ${userId}`);
  }
  return userById;
};

export const getUserListService = async (): Promise<UserDocument[]> => {
  const userList = await User.find();
  return userList;
};

export const findUserByEmailService = async (
  email: string
): Promise<UserDocument> => {
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    throw new NotFoundError(`User with ${email} not found`);
  }
  return foundUser;
};

export const updateUserByIdService = async (
  userId: string,
  updateUserInformation: Partial<UserDocument>
): Promise<UserDocument> => {
  const userById = await User.findByIdAndUpdate(userId, updateUserInformation, {
    new: true,
  });
  if (!userById) {
    throw new NotFoundError(`No user found having ${userId}`);
  }
  return userById;
};

export const toggleRoleService = async (userId: string) => {
  const foundUser = await User.findOne({ _id: userId });
  if (foundUser) {
    if (foundUser.role === "admin") {
      foundUser.role = "user";
    } else {
      foundUser.role = "admin";
    }

    updateUserByIdService(userId, foundUser);
  } else {
    throw new NotFoundError(`User not found with ${userId}`);
  }
};
