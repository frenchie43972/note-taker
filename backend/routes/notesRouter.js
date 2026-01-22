import express from "express";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNotes,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

/*
  GET /notes
  This route will return a list of notes.
*/
router.get("/", getAllNotes);

/*
  GET /notes/:id
  This route will return one note.
*/
router.get("/:id", getNoteById);

/**
    POST /notes
    This route creates a new note.
 */
router.post("/", createNote);

/*
  DELETE /notes
  This route deletes a not by id
*/
router.delete("/:id", deleteNote);

/* 
  PUT /notes
  This route updates notes by id 
*/
router.put("/:id", updateNotes);

export default router;
