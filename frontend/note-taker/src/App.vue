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
  <main class="page">
    <h1 class="header">Welcome, Everyting is Fine!</h1>
    <NoteForm />

    <hr class="divider" />

    <p v-if="notesStore.loading" class="status">Loading...</p>
    <p v-else-if="notesStore.error" class="status status--error">{{ notesStore.error }}</p>

    <p v-else-if="notesStore.notes.length === 0" class="status">No notes yet.</p>

    <ul v-else class="notes-grid">
      <NoteItem v-for="note in notesStore.notes" :key="note.id" :note="note" />
    </ul>
  </main>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  line-height: 1.4;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

/* Consistent spacing between major blocks */
.section {
  margin: 16px 0;
}

.divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 16px 0;
}

/* Status messages */
.status {
  margin: 0;
  font-size: 14px;
}

.status--error {
  color: #b00020;
}

/* Centered responsive card grid */
.notes-grid {
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  gap: 12px;

  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: start;
}
</style>
