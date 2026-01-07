import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('notes.db');

const notesTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    )
  `);

  console.log('Database Connected');
};

export { db, notesTable };
