import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import productsRouter from "./routers/productsRouter.js";

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.once("open", () => console.log("DB ✅"));
db.on("error", (error) => console.log("DB ❌", error));

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

app.use("/products", productsRouter);

app.listen(5000, () => console.log("Server running..."));
