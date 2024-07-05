import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find();
  return res.send(books);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const books = await Book.find({ _id: id });
  return res.send(books[0]);
});

router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req?.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "All Fields Are Required" });
    }
    const book = await Book.create({ title, author, publishYear });
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Book Id Required" });
    }

    const book = await Book.findByIdAndUpdate(id, body);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Book Id Required" });
    }

    const book = await Book.deleteOne({ _id: id });
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
