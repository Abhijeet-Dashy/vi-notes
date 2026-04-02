import express from "express";
import { registerUser, loginUser, googleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);

export default router;