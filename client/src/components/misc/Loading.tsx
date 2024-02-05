import React from "react";

import Typewriter from "typewriter-effect";
import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <React.Fragment>
      <CircularProgress size="10rem" color="inherit" />
      <h2>
        <Typewriter
          options={{
            strings: [
              "Loading...",
              "Free instance at Render",
              "It may take several seconds to load API",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
          }}
        />
      </h2>
    </React.Fragment>
  );
}
