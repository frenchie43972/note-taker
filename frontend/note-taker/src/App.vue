<script setup>
import { onMounted } from 'vue'
import { useNotesStore } from './stores/notesStore'

const notesStore = useNotesStore()

onMounted(() => {
  notesStore.fetchNotes()
})
</script>

<template>
  <main>
    <h1>Welcome, Everyting is Fine!</h1>
    <!-- Loading state -->
    <p v-if="notesStore.loading">Loading...</p>

    <!-- Error state -->
    <p v-else-if="notesStore.error">
      {{ notesStore.error }}
    </p>

    <!-- Notes list -->
    <ul v-else>
      <li v-for="note in notesStore.notes" :key="note.id">
        <strong>
          {{ note.title }}
        </strong>
        <p>{{ note.body }}</p>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
