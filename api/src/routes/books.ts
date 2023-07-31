import { Router } from "express";
import passport from "passport";

import { addNewBook, getBookById, getAllBooks } from "../controllers/books";

const router = Router();

router.post("/",  passport.authenticate("jwt", { session: false }), addNewBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);

export default router;
