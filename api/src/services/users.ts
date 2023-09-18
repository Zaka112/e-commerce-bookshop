import { AlreadyExist, InternalServerError, NotFoundError } from "../helpers/apiError";
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

export const findOrCreateUserService = async (
  payload: Partial<UserDocument>
): Promise<UserDocument> => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    return user;
  } else {
    const newUser = new User({
      email: payload.email,
      userName: payload.userName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      avatar: payload.avatar,
    });

    try {
      return await newUser.save();
    } catch (error) {
      console.error("Error creating account by:", error);
      throw new InternalServerError(
        "An error occured while creating the account."
      );
    }
  }
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

   const toggledUser =updateUserByIdService(userId, foundUser);
   return toggledUser

  } else {
    throw new NotFoundError(`User not found with ${userId}`);
  }
};
