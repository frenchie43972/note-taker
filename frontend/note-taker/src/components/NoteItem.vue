<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
})

const notesStore = useNotesStore()

const editing = ref(false)

const editTitle = ref(props.note.title)
const editBody = ref(props.note.body)

function startEdit() {
  editing.value = true
  editTitle.value = props.note.title
  editBody.value = props.note.body
}

function cancelEdit() {
  editing.value = false
}

async function saveEdit() {
  await notesStore.editNote(props.note.id, editTitle.value, editBody.value)

  // Exit edit mode
  editing.value = false
}
</script>

<template>
  <!-- View Mode -->
  <li class="note-card">
    <!-- View mode -->
    <div v-if="!editing" class="note-card__content">
      <h2 class="note-card__title">{{ note.title }}</h2>
      <p class="note-card__body">{{ note.body }}</p>

      <div class="note-card__actions">
        <button class="note-card__button" @click="startEdit">Edit</button>
        <button
          class="note-card__button note-card__button--danger"
          @click="notesStore.deleteNote(note.id)"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Edit mode -->
    <div v-else class="note-card__content">
      <input class="note-card__input" v-model="editTitle" />

      <textarea class="note-card__textarea" v-model="editBody" rows="4"></textarea>

      <div class="note-card__actions">
        <button class="note-card__button" @click="saveEdit">Save</button>
        <button class="note-card__button" @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.note-card {
  list-style: none;
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  padding: 12px;
  display: flex;
}

.note-card__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.note-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.note-card__body {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.note-card__input,
.note-card__textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.note-card__textarea {
  resize: vertical;
}

.note-card__actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.note-card__button {
  padding: 6px 10px;
  font-size: 13px;
  border: none;
  border-radius: 4px;
  background: #e8e2d8;
  cursor: pointer;
}

.note-card__button:hover {
  background: #bfc6c4;
}

.note-card__button--danger {
  background: #e5533d;
  color: #e8e2d8;
}

.note-card__button--danger:hover {
  background: #cf452f;
}
</style>
