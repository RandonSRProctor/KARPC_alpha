import express from 'express';
import { getNote, getNotes, createNote } from './database.js';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.get('/notes', async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
});
app.get('/notes/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.send('Invalid id.  Please provide a number.');
    }
    else {
        const note = await getNote(id);
        res.send(note);
    }
});
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
app.post('/notes', async (req, res) => {
    const { title, contents } = req.body;
    const note = await createNote(title, contents);
    res.status(201).send(note);
});
app.listen(8080, () => {
    console.log('Server is running on 8080');
});
//# sourceMappingURL=app.js.map