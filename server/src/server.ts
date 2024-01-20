import express from "express";
import { getNote, createNote, getFullConversation } from "./database.js";
import cors from "cors";

console.log("2.1 start server");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/conversation", async (req, res) => {
  const conversation = await getFullConversation();
  console.log("Sending conversation!");
  res.send(conversation);
});

app.get("/notes/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.send("Invalid id.  Please provide a number.");
  } else {
    const note = await getNote(id);
    console.log(`Sending note for id: ${id}`);
    res.send(note);
  }
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  console.log(`Creating new note: ${title}`);
  res.status(201).send(note);
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
