import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import { AppDispatch, RootState } from "../../redux/store";
import { userActions } from "../../redux/slices/user";
import { getSingleUser } from "../../redux/thunk/users";
import NotFound from "../Error";
import { BASE_URL } from "../../api";


export default function UserInformation() {
  const dispatch = useDispatch();
  // get user information from redux
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );

  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  
  const [updateData, setUpdateData] = useState({
    firstName: userInformation?.firstName,
    lastName: userInformation?.lastName,
    country: userInformation?.country,
    interests: userInformation?.interests,
    gender: userInformation?.gender,
  });
  
   const dispatchApp = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();
  const singleUserURL = `${BASE_URL}/users/${userId}`;
  useEffect(() => {
    dispatchApp(getSingleUser(singleUserURL));
  }, [dispatchApp, singleUserURL]);

  const [readOnly, setReadOnly] = useState(true);

  function updateFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdateData({ ...updateData, firstName: event.target.value });
  }
  function updateLastName(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdateData({ ...updateData, lastName: event.target.value });
  }
  function updateCountry(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdateData({ ...updateData, country: event.target.value });
  }
  function updateInterests(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdateData({ ...updateData, interests: event.target.value });
  }
  function updategender(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdateData({ ...updateData, gender: event.target.value });
  }

  function onEditHandler() {
    setReadOnly(false);
  }
  const navigate = useNavigate();
  function onCloseHandler() {
    navigate(-1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = localStorage.getItem("userToken"); // token from local storage

    const url = `${BASE_URL}/users/${userInformation?._id}`;
    axios
      .put(url, updateData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response, "new data"); //TODO:: remove later display new information
        if (response.status === 201) {
          onSuccess();
          // update information in redux
          dispatch(userActions.setUserData(response.data));
          // //TODO:: try fetch user by id - useParams
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          onError(); // in case of expiry
          return;
        }
      });
    setReadOnly(true);
  }
  function onSuccess() {
    confirmAlert({
      title: `Awesome! ${userInformation?.firstName}`,
      message: `Information updated`,
      buttons: [
        {
          label: "OK",
        },
      ],
    });
  }

  function onError() {
    confirmAlert({
      title: `Ooops! Something wrong`,
      message: `Please make sure you are Sign In`,
      buttons: [
        {
          label: "OK, Sign In",
          onClick: () => navigate("/users/signin"),
        },
      ],
    });
  }
console.log(userInformation, "User Information")
  if (!userInformation ) {
    return <NotFound />;
  } else if (isLoading) {
    <Paper>
      <CircularProgress sx={{ fontsize: 100 }} />
    </Paper>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome {userInformation?.userName}
        </Typography>
        <Box
          component="form"
          noValidate={false}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={updateData.firstName}
                inputProps={{ readOnly: readOnly }}
                onChange={updateFirstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={updateData.lastName}
                inputProps={{ readOnly: readOnly }}
                onChange={updateLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                value={userInformation?.userName}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userInformation?.email}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                value={updateData.gender}
                onChange={updategender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="country"
                label="Country"
                type="text"
                name="Country"
                value={updateData.country}
                inputProps={{ readOnly: readOnly }}
                onChange={updateCountry}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="interests"
                label="Interests"
                name="interests"
                value={updateData.interests}
                multiline
                inputProps={{ readOnly: readOnly }}
                onChange={updateInterests}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
          <Button
            onClick={onEditHandler}
            variant="contained"
            sx={{ mt: 3, mb: 2, marginLeft: 2 }}
          >
            Edit
          </Button>
          <Button
            onClick={onCloseHandler}
            variant="contained"
            sx={{ mt: 3, mb: 2, marginLeft: 2 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
