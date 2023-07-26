import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import notFound from "../assets/notFound.jpg"

export default function NotFound() {
    const navigate= useNavigate()
  return (
    <Paper
      sx={{
        minHeight: 800,
       background: `url(${notFound})`,
      // backgroundImage:`url(${notFound})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>
       The page you are looking for does not exist. 
        <Button onClick={()=>navigate(-1)}>Go back</Button>
      </Typography>
    </Paper>
  );
}
