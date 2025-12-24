const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../db/database.db');

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Database Connected');
});

// initializes the database and ensures required tables exist when the app
// starts, so routes can assume the schema is ready.
db.run(
  `
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
  }
);

module.exports = db;
