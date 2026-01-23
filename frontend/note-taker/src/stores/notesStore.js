import { defineStore } from 'pinia'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/*
  Notes store 
  This will own all note data for the frontend
*/
export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [], // list of notes from the BE stored in an array
    loading: false, // Will be used by the UI to show loading state
    error: null,
  }),

  actions: {
    /*
      Fetch all notes from the BE
      Same as GET /notes from the server
    */
    async fetchNotes() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`${API_BASE_URL}/notes`)

        if (!response.ok) {
          throw new Error('Failed to fetch notes')
        }

        // Reads the JSON response from the body
        const data = await response.json()

        // Updates the reactive state triggering a re-render
        this.notes = data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    /*
      Create a new note, then update local state.
    */
    async createNote(title, body) {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      })

      if (!response.ok) {
        throw new Error('Failed to create note')
      }

      const newNote = await response.json()
      this.notes.push(newNote)
    },

    /*
      Delete a note by id, then remove it from local state.
    */
    async deleteNote(id) {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete note')
      }

      this.notes = this.notes.filter((note) => note.id !== id)
    },
  },
})
