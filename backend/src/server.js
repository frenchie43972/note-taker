import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

// This creates the an Express application
// This object will store route definitions and handle requests
const app = express();
const db = new sqlite3.Database('./notes.db');

app.use(express.json());

app.use(cors());

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )
`);

// If a GET request comes to the "/" path, run the function (handler)
app.get('/', (req, res) => {
  res.send('Welcome, Everything is Fine!');
});

// GET all rows in the notes table
app.get('/notes', (req, res) => {
  const sql = `SELECT * FROM notes`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

// POST to add new notes to the table
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  const sql = `INSERT INTO notes (title, content) VALUES (?, ?)`;

  db.run(sql, [title, content], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      title,
      content,
    });
  });
});

// DELETE note. Check first if there is a not with that id.
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM notes WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note id not found' });
    }
  });

  // If the delete is successful, send the 204 status
  res.status(204).send();
});

// Start listening for HTTP requests on port 3000
// This keeps the Node process alive
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
