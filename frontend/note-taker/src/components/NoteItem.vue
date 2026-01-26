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
  <li>
    <div v-if="!editing">
      <strong>
        {{ note.title }}
      </strong>
      <p>{{ note.body }}</p>
      <button @click="startEdit(note)">Edit</button>
      <button @click="notesStore.deleteNote(note.id)">Delete</button>
    </div>

    <!-- Edit Mode -->
    <div v-else>
      <input v-model="editTitle" />
      <textarea v-model="editBody"></textarea>
      <button @click="saveEdit">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </li>
</template>

<style scoped></style>
