import Express from "express";
import cors from "cors";
import passport from "passport";

import booksRouter from "./routes/books";
import usersRouter from "./routes/users";
import ordersRouter from "./routes/orders";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import { jwtStrategy } from "./config/passport";

const app = Express();

app.use(Express.json());
app.use(cors());
//initilize passport and mention the stretegy you gonna use
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.use(apiErrorHandler);

export default app;
