<script setup>
import { ref, onMounted } from 'vue'

const notes = ref([])
const title = ref('')
const content = ref('')

onMounted(async () => {
  const res = await fetch('http://localhost:3000/notes')

  notes.value = await res.json()
})

async function createNote() {
  if (!title.value || !content.value) return

  const res = await fetch('http://localhost:3000/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  })

  const newNote = await res.json()
  notes.value.unshift(newNote)

  title.value = ''
  content.value = ''
}

async function deleteNote(id) {
  await fetch(`http://localhost:3000/notes/${id}`, {
    method: 'DELETE',
  })

  notes.value = notes.value.filter((n) => n.id !== id)
}
</script>

<template>
  <div>
    <h1>Notes</h1>
    <ul>
      <li v-for="note in notes" :key="note.id">
        <strong>{{ note.title }}</strong>
        {{ note.content }}
        <button @click="deleteNote(note.id)">Delete</button>
      </li>
    </ul>
  </div>
  <form @submit.prevent="createNote">
    <input v-model="title" placeholder="Title" />
    <br />
    <textarea v-model="content" placeholder="Note Content"></textarea>
    <br />
    <button type="submit">Add Note</button>
  </form>
</template>

<style scoped></style>
