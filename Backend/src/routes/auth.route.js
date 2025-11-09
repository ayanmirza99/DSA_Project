import express from "express";
import { checkAuth, login, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-auth", authMiddleware, checkAuth);

export default router;
