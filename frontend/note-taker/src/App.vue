<script setup>
import { onMounted } from 'vue'
import { useNotesStore } from './stores/notesStore'
import NoteForm from './components/NoteForm.vue'
import NoteItem from './components/NoteItem.vue'

const notesStore = useNotesStore()

onMounted(() => {
  notesStore.fetchNotes()
})
</script>

<template>
  <main>
    <h1>Welcome, Everyting is Fine!</h1>
    <NoteForm />

    <p v-if="notesStore.loading">Loading...</p>
    <p v-else-if="notesStore.error">{{ notesStore.error }}</p>

    <ul v-else>
      <NoteItem v-for="note in notesStore.notes" :key="note.id" :note="note" />
    </ul>
  </main>
</template>

<style scoped></style>
