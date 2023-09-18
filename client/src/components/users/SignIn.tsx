import * as React from "react";

import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  Container,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";

import { userActions } from "../../redux/slices/user";
import { BASE_URL } from "../../api";
import GoogleLogIn from "./google/GoogleLogin";


export default function SignIn() {
  const [invalidCredential, setInvalidCredential] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userLogin = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const endpoint = `${BASE_URL}/users/signin`;
    axios
      .post(endpoint, userLogin)

      .then((response) => {
        if (response.status === 200) {
          dispatch(userActions.setUserData(response.data.userData)); // store userinformation to the redux
          const userToken = response.data.token; // from data object. get and assign the token

          localStorage.setItem("userToken", userToken); // save it (token) to the localStorage
          navigate("/books");
        }
      })
      .catch((error) => {
        console.log(error);
        setInvalidCredential("Wrong Credential - try again");
      });
  };

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
        
      > <Typography component="div" variant="h5" margin={1}>Sign in using Google</Typography>
        <GoogleLogIn/>
        <Typography component="div" variant="h5">OR</Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate={false}
          sx={{ mt: 1 }}
        >
          {invalidCredential !== "" ? (
            <Paper className="error">
              {invalidCredential} <br />
              <Link to="/users/register">
                Don't have an account yet? Sign Up
              </Link>
            </Paper>
          ) : null}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

        
          <Grid container>
            <Grid item>
              <Link to="/users/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
