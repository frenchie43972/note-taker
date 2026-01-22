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
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})
