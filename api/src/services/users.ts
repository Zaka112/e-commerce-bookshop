import User, { UserDocument } from "./../models/User";

export const createUserService = async (user: UserDocument): Promise<UserDocument> => {
  return await user.save();
};

export const getAllUserService = async (): Promise<UserDocument [] | undefined> => {
  return await User.find();
};

