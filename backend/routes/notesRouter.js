import express from 'express';
import { getAllNotes, createNote } from '../controllers/notesController.js';

const router = express.Router();

/*
  GET /notes
  This route will return a list of notes.
*/
router.get('/', getAllNotes);

/**
    POST /notes
    This route creates a new note.
 */
router.post('/', createNote);

export default router;
