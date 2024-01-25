import express from 'express';
import {
  getMessage,
  createMessage,
  getFullConversation,
  getLastTenMessages,
} from './database.js';
import cors from 'cors';

console.log('2.1 start server');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

app.get('/conversation', async (req, res) => {
  const conversation = await getFullConversation();
  console.log('Sending conversation!');
  res.send(conversation);
});

app.get('/conversation/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    // bad request
    res.status(400).send('Invalid id.  Please provide a number.');
  } else {
    const message = await getMessage(id);
    // TODO: Get this logic correct
    if (message) {
      // is OK
      res.status(200).json(message);
    } else {
      res.status(404).send('Message not found');
    }
  }
});

app.get('/conversation', async (req, res) => {
  const conversation = await getLastTenMessages();
  console.log(`Sending last ten messages!`);
  res.send(conversation);
});

app.post('/conversation/createMessage', async (req, res) => {
  try {
    const { user, message_text } = req.body;
    const newMessage = await createMessage(user, message_text);
    console.log(`Creating new message: ${user} : ${message_text}`);
    //res.status(201) request fullfilled and new resource created
    res.status(201).send(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
