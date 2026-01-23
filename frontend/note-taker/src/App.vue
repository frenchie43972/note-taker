<script setup>
import { ref, onMounted } from 'vue'
import { useNotesStore } from './stores/notesStore'

const notesStore = useNotesStore()

const title = ref('')
const body = ref('')

// onMounted runs ONCE, after the component is placed on the page
// This is where initial data loading belongs
onMounted(() => {
  notesStore.fetchNotes()
})

async function submitNote() {
  // Ensures no empty field values
  if (!title.value || !body.value) return

  // Asks the store to create a new note
  await notesStore.createNote(title.value, body.value)

  // Resets the form inputs
  title.value = ''
  body.value = ''
}
</script>

<template>
  <main>
    <h1>Welcome, Everyting is Fine!</h1>

    <!-- v-model binds input values to refs. When the user types, the ref updates. When the ref updates, the input updates. -->
    <form @submit.prevent="submitNote">
      <input v-model="title" placeholder="Title" />
      <textarea v-model="body" placeholder="Note Body"></textarea>
      <button type="submit">Add Note</button>
    </form>

    <!-- Loading state -->
    <p v-if="notesStore.loading">Loading...</p>

    <!-- Error state -->
    <p v-else-if="notesStore.error">
      {{ notesStore.error }}
    </p>

    <!-- Notes list -->
    <ul v-else>
      <!-- v-for renders one <li> per note. :key helps Vue track which items changed. -->
      <li v-for="note in notesStore.notes" :key="note.id">
        <strong>
          {{ note.title }}
        </strong>
        <p>{{ note.body }}</p>
        <button @click="notesStore.deleteNote(note.id)">Delete</button>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
