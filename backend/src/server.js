import express from 'express';
import notesRouter from './routes/notes.js';
import { notesTable } from './db.js';

const app = express();
const PORT = 3000;

notesTable();
app.use(express.json());
app.use('/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT}`);
});
