import { Router } from "express";

import { addNewOrder } from "../controllers/orders";

const router = Router()

router.post("/", addNewOrder)

export default router