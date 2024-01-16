import { usersActions } from "../slices/users";
import { AppDispatch } from "../store";

import { User } from "types/types";
import { BASE_URL } from "api";
import { userActions } from "../slices/user";

const userListURL = `${BASE_URL}/users`;

export function getUserList() {
  const token = localStorage.getItem("userToken");
  return async (dispatch: AppDispatch) => {
    const response = await fetch(userListURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedUserList: User[] = await response.json();

    dispatch(usersActions.setUserList(fetchedUserList));
  };
}
// fetch single user by id

export function getSingleUser(singleUserURL: string) {
  const token = localStorage.getItem("userToken");
  return async (dispatch: AppDispatch) => {
    const response = await fetch(singleUserURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedSingleUser = await response.json();
    dispatch(userActions.setUserData(fetchedSingleUser));
  };
}
