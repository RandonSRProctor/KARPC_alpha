import express from "express";
import { getNote, createMessage, getFullConversation } from "./database.js";
import cors from "cors";

console.log("2.1 start server");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
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

app.post("/messsage", async (req, res) => {
  switch (true) {
    case !req.body:
      res.status(400).send("400: Request Body undefined");
      console.log("400: Request Body undefined");
      break;
    case req.body.message_text.length > 255:
      res.status(400).send("400: 'message_text' exceeded 255 chars");
      console.log("400: 'message_text' exceeded 255 chars");
      break;
    case req.body.user.length > 255:
      res.status(400).send("400: 'user' property exceeded 255 chars");
      console.log("400: 'user' property exceeded 255 chars");
      break;
    default:
      const { user, message_text } = req.body;
      const note = await createMessage(user, message_text);
      console.log(`Creating new note: ${user}`);
      res.status(201).send(note);
  }
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
