<script setup>
import { ref, onMounted } from 'vue'
import { getNotes, createNote, deleteNote, updateNote } from './api/notes'

const notes = ref([])

const loading = ref(false)
const error = ref(null)

const title = ref('')
const body = ref('')

const editingId = ref(null)

onMounted(async () => {
  notes.value = await getNotes()
})

async function handleDeleteNote(id) {
  await deleteNote(id)
  notes.value = notes.value.filter((note) => note.id !== id)
}

async function handleSubmit() {
  loading.value = true
  error.value = null

  try {
    if (editingId.value === null) {
      const newNote = await createNote({
        title: title.value,
        body: body.value,
      })
      notes.value.push(newNote)
    } else {
      const updatedNote = await updateNote(editingId.value, {
        title: title.value,
        body: body.value,
      })

      notes.value = notes.value.map((note) => {
        return note.id === editingId.value ? updatedNote : note
      })
    }

    resetForm()
  } catch (err) {
    error.value = err.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

function startEdit(note) {
  editingId.value = note.id
  title.value = note.title
  body.value = note.body
}

function resetForm() {
  editingId.value = null
  title.value = ''
  body.value = ''
}
</script>

<template>
  <div>
    <h1>Notes</h1>
    <ul v-if="notes.length">
      <li v-for="note in notes" :key="note.id">
        <strong>{{ note.title }}</strong>
        <p>{{ note.body }}</p>
        <button @click="handleDeleteNote(note.id)">Delete</button>
        <button @click="startEdit(note)">Edit</button>
      </li>
    </ul>
    <p v-else>No Notes Found.</p>
  </div>
  <hr />
  <p v-if="error">{{ error }}</p>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" placeholder="Add Title..." />
    <textarea v-model="body" placeholder="Add Note..."></textarea>

    <p v-if="loading">Saving...</p>

    <button type="submit">Save</button>
  </form>
</template>

<style scoped></style>
