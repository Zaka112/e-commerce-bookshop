import React from "react";

import { Typography, Paper, Grid, styled, Button } from "@mui/material";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { User } from "../../../types/types";
import { BASE_URL } from "../../../api";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type Prop = {
  userItem: User;
};
export default function UserItems({ userItem }: Prop) {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  );
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );

  function toggleRole(_id: string): void {
    const token = localStorage.getItem("userToken"); // token from local storage

    const url = `${BASE_URL}/users/${userItem?._id}/toggle-role`;
    axios
      .put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("success");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error); //   onError(); // in case of expiry
          return;
        }
      });
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item></Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs></Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                {userItem.userName} :: {userItem.role}
              </Typography>
              <Button
                onClick={
                  userInformation?.role === "admin"
                    ? () => toggleRole(userItem._id)
                    : () => {
                        alert("not authorized");
                      }
                }
              >
                {userItem.role === "admin" ? "Make User" : "Make Admin"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
