import express from 'express';
import cors from 'cors';
import router from './routes/notesRouter.js';
import db from './db/database.js';

const app = express();
const port = 3000;

const notesRouter = router;

// global middleware
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

// mount routes
app.use('/notes', notesRouter);

app.get('/', (req, res) => {
  res.send('Welcome, Everything is Fine!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
