import "dotenv/config";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.routes.js'
import taskRouter from './routes/task.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'

const app = express();
app.use(cors({
  // origin:process.env.FRONTEND_URL || "http://localhost:5173", //Local URL
  origin:process.env.FRONTEND_URL,//Production URL
  credentials: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api/tasks", taskRouter)
app.use("/api/dashboard", dashboardRouter)
app.get("/", (req, res) => {
  res.send("Hello from Focusly Server!");
});

export default app;

 
