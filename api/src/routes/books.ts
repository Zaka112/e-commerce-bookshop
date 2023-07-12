import { Router } from "express";

import { addNewBook,  getBookById, getAllBooks,  } from "../controllers/books";

const router = Router();

router.post("/", addNewBook);
router.get("/", getAllBooks)
router.get("/:id", getBookById)

export default router;