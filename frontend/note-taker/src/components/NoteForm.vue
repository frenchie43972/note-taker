<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const notesStore = useNotesStore()

const title = ref('')
const body = ref('')

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
  <!-- v-model binds input values to refs. When the user types, the ref updates. When the ref updates, the input updates. -->
  <form @submit.prevent="submitNote">
    <input v-model="title" placeholder="Title" />
    <textarea v-model="body" placeholder="Note Body"></textarea>
    <button type="submit">Add Note</button>
  </form>
</template>

<style scoped></style>
