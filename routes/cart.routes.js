

import express from "express";
import { addToCart, deleteCart, getCart } from "../controllers/cart.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-cart", authenticate, addToCart);
router.get("/get-cart", authenticate, getCart);
router.delete('/:cartId', authenticate, deleteCart);


export default router;
