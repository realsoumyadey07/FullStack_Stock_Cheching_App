import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import savedRouter from "./routes/saved.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URL;
const app = express();

app.use(cors({
     origin: true,
     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
     credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running on 8000",
  });
});

app.use("/api/user", userRouter);
app.use("/api/saved", savedRouter);

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on: ${port}👍`);
    });
    console.log("Database is connected!");
  })
  .catch((err) => {
    console.error(err.message);
  });

