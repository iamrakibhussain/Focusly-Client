import "dotenv/config";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.routes.js'
import taskRouter from './routes/task.routes.js'

const app = express();
app.use(cors({
  // origin:process.env.FRONTEND_URL || "http://localhost:5173",
  origin:process.env.FRONTEND_URL,
  credentials: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api/tasks", taskRouter)
app.get("/", (req, res) => {
  res.send("Hello from Focusly Server!");
});

export default app;

