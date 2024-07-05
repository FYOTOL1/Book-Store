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

app.listen(PORT, () => {
  console.log("Connected PORT");
  mongoose
    .connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected DB");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
