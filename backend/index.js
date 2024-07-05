import express from "express";
import mongoose from "mongoose";
import { PORT, MongoURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/books", booksRoute);

mongoose
  .connect(MongoURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
