import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

/* Output Log stream */
import { writeLogsStream } from "./utils/logs.js";

/* Authorization middleware */
import { isAuthorized } from "./middleware/authorize.js";

const app = express();
const PORT = process.env.PORT || 3000;

/* MIDDLEWARE SETUp */
app.use(cors());
app.use(morgan("combined", { stream: writeLogsStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send("✅ test successful.");
});

/* DB CONNECTION */
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on("error", (error) =>
  console.log("❌ Error while connecting to MongoDB", error)
);
db.once("open", () => console.log("✅ Connect to MongoDB."));

/* ROUTER SETUP */
import { router as authRouter } from "./routers/authRouter.js";
import { router as tasksRouter } from "./routers/tasksRouter.js";
import { router as usersRouter } from "./routers/usersRouter.js";

app.use("/auth", authRouter);
app.use("/api/tasks", isAuthorized, tasksRouter);
app.use("/api/users", isAuthorized, usersRouter);

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
