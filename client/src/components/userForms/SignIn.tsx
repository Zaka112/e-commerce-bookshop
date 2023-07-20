import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/user";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        BuY !T
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

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
    const endpoint = "http://localhost:5001/users/signin";
    axios
      .post(endpoint, userLogin)
      // .then((result)=> console.log(result))
      .then((response) => {
        if (response.status === 200) {

          dispatch(userActions.setUserData(response.data.userData)); // store userinformation to the redux
          const userToken = response.data.token; // from data object. get and assign the token
          localStorage.setItem("userToken", userToken); // save it (token) to the localStorage
          
          navigate(`/users`);
          //navigate(`/users${response.data.useData._id}`);
          ///${response.data.useData._id}
        }
        console.log(response.data); // console for quiuck checkup
      })
      .catch((error) => {
        console.log(error);
        setInvalidCredential("Wrong Credential - try again");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
                <Link href="register" variant="body2">
                  {"Don't have an account yet? Sign Up"}
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
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
