import { NotFoundError } from "../helpers/apiError";
import User, { UserDocument } from "./../models/User";

export const createUserService = async (
  user: UserDocument
): Promise<UserDocument> => {
  return await user.save();
};

export const getAllUserService = async (): Promise<UserDocument[]> => {
  return (await User.find());
};
// idea to get a specific item by name
// export const getAllUserService = async (userId:string): Promise<UserDocument[]> => {
//   return await User.find({firstName:userId});
// };

export const getUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  const userById = await User.findById(userId);
  if (!userById) {
    throw new NotFoundError(`No user found having ${userId}`);
  }
  return userById;
};

export const deleteUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  const userById = await User.findByIdAndDelete(userId);
  if (!userById) {
    throw new NotFoundError(`No user found having ${userId}`);
  }
  return userById;
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
