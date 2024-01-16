import React from "react";

import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";

import notFound from "assets/notFound.jpg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
   <Paper 
      sx={{
        minHeight: 600,
        background: `url(${notFound})`,
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ backgroundColor: "red", borderRadius: 2 }}
      >
        The page you are looking for does not exist.
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </Typography>
    </Paper>
  );
}
