import React from "react";

import { Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material";

import errorLogo from "../assets/Error.svg.png";

export default function NotFound() {
  return (
    <Paper
      className="error"
      sx={{
        minHeight: 600,
        background: `url(${errorLogo})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" component="div" sx={{backgroundColor:"red"}}>
        You are not authoriezed for this. Please{" "}
        <Link to="/users/signin">Sign In</Link>
      </Typography>
    </Paper>
  );
}
