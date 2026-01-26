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
  <form class="note-form" @submit.prevent="submitNote">
    <input class="note-form__input" v-model="title" placeholder="Title" />
    <textarea class="note-form__textarea" v-model="body" placeholder="Note Body"></textarea>
    <div class="note-form__actions">
      <button class="note-form__button" type="submit">Add Note</button>
    </div>
  </form>
</template>

<style scoped>
.note-form {
  display: grid;
  gap: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.note-form__input,
.note-form__textarea {
  width: 100%;
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.note-form__textarea {
  resize: vertical;
}

.note-form__actions {
  display: flex;
  justify-content: flex-end;
}

.note-form__button {
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  background: #2c7be5;
  color: #fff;
  cursor: pointer;
}

.note-form__button:hover {
  background: #1f6ad8;
}
</style>
