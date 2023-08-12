import * as React from "react";

import {
  Typography,
  Paper,
  Grid,
  styled,
  IconButton,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../../redux/store";
import { usersActions } from "../../../redux/slices/users";
import { User } from "../../../types/types";
import { BASE_URL } from "../../../api";
import axios from "axios";
import UserList from "./UserList";
import UserListPage from "../../../pages/users/userRoleList/UserListPage";

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
   const dispatch = useDispatch<AppDispatch>();
   
   
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
        console.log(response, "new data"); //TODO:: remove later display new information
        if (response.status === 201) {
          console.log("success");
           //onSuccess();
         //  dispatch(usersActions.getUsers(Users[]));
          // update information in redux

          // //TODO:: try fetch user by id - useParams
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
          {/* <Grid item>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    handelFavoriteuserIcon(userItem);
                  }}
                  sx={isFavorite ? { color: "red" } : { color: "inherit" }}
                >
                  <FavoriteIcon fontSize="small" />
                </IconButton>
                <Typography variant="subtitle1" component="div">
                  ${userItem.price}
                </Typography>
              </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
}
