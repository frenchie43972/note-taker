const express = require('express');
const router = express.Router();
const db = require('../db.js');

// GET /notes
router.get('/', (req, res) => {
  db.all(`SELECT * FROM notes`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database Error' });
    }
    res.json(rows);
  });
});

// GET /notes/count
router.get('/count', (req, res) => {
  res.json({
    count: 0,
  });
});

// POST
router.post('/', (req, res) => {
  const { title, content } = req.body;

  // Inserts new note data into the id, title and content rows
  // lastID is SQLite setting to the new row's ID so no ID duplication
  // [title, content] fill in VALUES (?. ?)
  db.run(
    `
    INSERT INTO notes (title, content) VALUES (?, ?)`,
    [title, content],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database Error' });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM notes WHERE id  = ?`, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database Error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'ID not found' });
    }
    res.status(204);
  });
});

module.exports = router;
