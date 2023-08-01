import { Router } from "express";
import passport from "passport";

import { addNewBook, getBookById, getAllBooks } from "../controllers/books";
import roleCheck from "../middlewares/roleCheck";

const router = Router();

router.post("/",  passport.authenticate("jwt", { session: false }), roleCheck, addNewBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);

export default router;
