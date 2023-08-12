
import React from "react";

import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { userActions } from "../../redux/slices/user";

export default function NavUserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  let isLogin = useSelector((state: RootState) => state.user.isLogin);
  let userId: string;
  if (userInformation) {
    userId = userInformation?._id;
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
 
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  function showProfile(): void {
    navigate(`/users/${userId}`);
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function shopHistory(userId: string): void {
    navigate(`/orders/${userId}`);
    setAnchorEl(null);
    handleMobileMenuClose();
  }
  function userList(): void {
    navigate("/users");
  }
  function signIn(): void {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/users/signin");
  }
  function signOut(): void {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(userActions.removeUserData());
    navigate("/users/signin");
  }
  return (
    <div>
      {" "}
      <MenuItem onClick={() => showProfile()}>Profile</MenuItem>
      <MenuItem onClick={() => shopHistory(userId)}>Shopping History</MenuItem>
      {userInformation?.role === "admin" ? (
        <MenuItem onClick={() => userList()}>UserList</MenuItem>
      ) : null}
      <MenuItem onClick={isLogin ? signOut : signIn}>
        {isLogin ? "Sign Out" : "Sign In"}
      </MenuItem>
    </div>
  );
}
