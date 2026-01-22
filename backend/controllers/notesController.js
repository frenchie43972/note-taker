/*
  Controller (action handlers) for note-related actions.
  Each function will corresond to one type of CRUD operation
*/
import { error } from "console";
import db from "../db/database.js";

/*
  GET /notes
  Returns all notes from the DB
*/
export function getAllNotes(req, res) {
  const sql = "SELECT id, title, body, created_at FROM notes";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch notes" });

      return;
    }
    res.json(rows);
  });
}

/*
  GET /notes/:id
  Returns one note by id
*/
export function getNoteById(req, res) {
  const { id } = req.params;

  const sql = `SELECT id, title, body, created_at FROM notes WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch note" });

      return;
    }

    if (!row) {
      res.status(404).json({ error: "Note not found" });

      return;
    }

    res.json(row);
  });
}

/*
  POST /notes
  Creats a note after input is validated
*/
export function createNote(req, res) {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: "title and body are required" });
  }

  const sql = ` INSERT INTO notes (title, body) VALUES (?, ?)`;

  db.run(sql, [title, body], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to create note" });

      return;
    }

    res.status(201).json({
      id: this.lastID,
      title,
      body,
    });
  });
}

/*
  DELETE /notes/:id
  Deletes a not by its id
*/
export function deleteNote(req, res) {
  // id comes from the URL, not the body so use req.params instead of req.body
  const { id } = req.params;

  const sql = "DELETE FROM notes WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to delete note" });

      return;
    }

    // this.changes tells how many rows were affected
    if (this.changes === 0) {
      res.status(404).json({ error: "Note not found" });

      return;
    }

    res.status(204).send();
  });
}

/*
  PUT /notes/:id
  Update an existing note's title and body.
*/
export function updateNotes(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: "title and body are required" });

    return;
  }

  const sql = `
      UPDATE notes
      SET title = ?, body = ?
      WHERE id = ?
    `;

  db.run(sql, [title, body, id], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to update note" });

      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({
      id,
      title,
      body,
    });
  });
}
