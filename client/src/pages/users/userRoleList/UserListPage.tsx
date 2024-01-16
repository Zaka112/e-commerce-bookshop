import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import UserList from "components/users/userRoleList/UserList";

export default function UserListPage() {
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  return <div>{userInformation?.role === "admin" ? <UserList /> : null}</div>;
}
