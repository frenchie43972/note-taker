import express from 'express';
import { db } from '../db.js';

const router = express.Router();
const notesDB = db;

// GET all notes
router.get('/', (req, res) => {
  const sql = `
    SELECT * FROM notes 
  `;
  notesDB.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET one note by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  notesDB.get(`SELECT * FROM notes WHERE id = ?`, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!rows) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows);
  });
});

// POST add a new note
router.post('/', (req, res) => {
  const { title, body } = req.body;
  const sql = `INSERT INTO notes (title, body) VALUES (?, ?)`;
  notesDB.run(sql, [title, body], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, body });
  });
});

// PUT edit a note based on id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const sql = `UPDATE notes SET title = ?, body = ? WHERE id = ?`;

  notesDB.run(sql, [title, body, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id, status: 'updated', title, body });
  });
});

// DELETE note by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  notesDB.run(`DELETE FROM notes WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id, status: 'deleted' });
  });
});

export default router;
