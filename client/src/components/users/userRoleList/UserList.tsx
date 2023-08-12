import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";

import { AppDispatch, RootState } from "../../../redux/store";
import { getUserList } from "../../../redux/thunk/users";
import UserItems from "./UserItems";

export default function UserList() {

 
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.userList.users);

  const isLoading = useSelector((state: RootState) => state.userList.isLoading);

  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );

 const excludeMe = userList.filter(user=> user._id!==userInformation?._id)

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Paper sx={{ minHeight: 600 }}>
        <CircularProgress size="10rem" color="inherit" />
      </Paper>
    );
    } else if (userInformation?.role!=="admin")
    {
      return (<Paper>not allowed</Paper>)
  } else
    return (
      <Paper>
        <Typography variant="h3" component="h3">
          User List
        </Typography>

        <Grid
          container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {excludeMe.map((userItem) => {
            return <UserItems key={userItem._id} userItem={userItem} />;
          })}
        </Grid>
      </Paper>
    );
}
