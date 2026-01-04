const express = require('express');
const notesRouter = require('./routes/notes.js');
const db = require('./db.js');

const app = express();

app.use(express.json());
app.use('/notes', notesRouter);

module.exports = app;
