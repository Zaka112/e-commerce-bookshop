import Express from "express";
import cors from "cors";

import booksRouter from "./routes/books";
import usersRouter from "./routes/users";
import apiErrorHandler from "./middlewares/apiErrorHandler"

const app = Express();

app.use(Express.json());
app.use(cors());

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.use(apiErrorHandler)

export default app
