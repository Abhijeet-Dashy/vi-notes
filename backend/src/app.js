import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN === "*" ? "*" : [process.env.CORS_ORIGIN || "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app;
