import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

dotenv.config();

const port = 8000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}...`);
    });
  })
  .catch((error: Error) => {
    console.log("Error connecting MongoDB. Please check connection.");
    process.exit(1);
  });
