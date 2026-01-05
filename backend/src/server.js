import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// create and open db
const db = new sqlite3.Database('./notes.db');

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )
`);

app.get('/', (req, res) => {
  res.send('Server Running');
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title and content required' });
  }

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

app.get('/notes', (req, res) => {
  const sql = `SELECT * FROM notes ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM notes WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(204).send();
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
