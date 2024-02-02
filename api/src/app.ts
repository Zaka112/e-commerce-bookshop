import express, { Request, Response } from "express";
import cors from "cors";
import passport from "passport";

import booksRouter from "./routes/books";
import usersRouter from "./routes/users";
import ordersRouter from "./routes/orders";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import { googleStrategy, jwtStrategy } from "./config/passport";
import paymentsRouter from "./routes/payments";


const app = express();

app.use(express.json());
app.use(cors());
//initilize passport and mention the stretegy you gonna use
app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(googleStrategy);

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/secret", paymentsRouter)

app.use(apiErrorHandler);

export default app;
