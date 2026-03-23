import { Router } from "express";
import { saveNote } from "../controllers/note.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/save", saveNote);

export default router;
