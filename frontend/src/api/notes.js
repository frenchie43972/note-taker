const BASE_URL = 'http://localhost:3000/notes'

export async function getNotes() {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`)
  }

  return response.json()
}

export async function getNotesById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`)
  }

  return response.json()
}

export async function createNote(note) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`)
  }

  return response.json()
}
export async function updateNote(id, note) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`)
  }

  return response.json()
}

export async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete note')
  }

  return response.json()
}
