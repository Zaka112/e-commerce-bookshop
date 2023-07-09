import { Router } from "express";

import { addNewBook, deleteBookById, getBookById, getAllBooks, updateBookInformation } from "../controllers/books";

const router = Router();

router.post("/", addNewBook);
router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.delete("/:id", deleteBookById)
router.put("/:id", updateBookInformation)

export default router;