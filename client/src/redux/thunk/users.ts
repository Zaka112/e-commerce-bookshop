import { usersActions } from "../slices/users";
import { AppDispatch } from "../store";

import { User } from "../../types/types";
import { BASE_URL } from "../../api";

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
    const fetchedUserList:User[] = await response.json();

    dispatch(usersActions.setUserList(fetchedUserList));
  };
}
