## Project Overview

This is a local-only, single-user note-taking application built as a portfolio project. The goal is to demonstrate a clean, end-to-end architecture using a modern Vue frontend, a lightweight Node/Express backend, and a SQLite database, with an emphasis on clarity, testability, and maintainable state management.

The application supports basic note management functionality: creating, reading, updating, and deleting notes. Notes can be searched using a simple text query and filtered based on their creation date.

## Core Features

- Create, edit, delete, and list notes
- Search notes by case-insensitive text match on title and content
- Filter notes by creation date
- Local persistence using SQLite
- Frontend state management with Pinia
- End-to-end testing with Cypress

=============================================================================

# Lessons Learned & Next-Project Upgrades

## Backend (Node / Express / SQLite)

### What Worked Well

Built a clean, understandable backend with a clear separation of responsibilities:

- `server.js` handles startup and middleware only
- Routes define endpoints and delegate work
- Controllers own request handling and responses
- SQLite provides real persistence with a simple schema

Implemented full CRUD with correct HTTP methods and status codes, used parameterized SQL safely, and proved persistence independently via Postman before trusting the frontend. That workflow is solid and transferable.

### Concepts That Need Reinforcement

A few areas caused repeated friction but were valuable learning points:

- The difference between **startup code** and **per-request code** (e.g. database initialization vs middleware)
- File system paths and why database paths must be resolved relative to the file, not the process
- Choosing the correct SQLite API (`get`, `all`, `run`) based on intent
- Understanding that backend state persists independently of frontend refreshes

These are foundational backend concepts and will become second nature after one or two more projects.

### Intentional Omissions

Avoided overengineering:

- No query abstraction layer
- No migrations system
- No pagination
- No centralized error handler
- No authentication or multi-user support

### Strong Next-Project Backend Upgrades

For the next project, good incremental upgrades would be:

- Extract SQL into a dedicated module (e.g. `db/notes.js`)
- Add pagination and limit/offset support to list endpoints
- Introduce a lightweight migration system instead of a single schema file
- Centralize error handling and response formatting
- Add backend tests for controllers
- Add filtering/search directly at the SQL level

---

## Frontend (Vue 3 / Pinia)

### What Worked Well

- Used Pinia as the single source of truth
- Kept API calls out of components
- Used lifecycle hooks (`onMounted`)
- Managed local UI state with `ref`
- Implemented full CRUD from the UI
- Refactored from a monolithic `App.vue` into focused components

### Concepts That Needed Reinforcement

These areas caused the most confusion but also the most growth:

- Understanding `ref` as reactive state, not just variables
- Lifecycle timing (`onMounted`) vs user-driven actions
- Why props are read-only and should not be mutated
- The boundary between **store responsibilities** (data, persistence)
  and **component responsibilities** (UI state, interaction)
- Pinia structure rules (only `actions` are exposed methods)

The duplicate-render/edit issue was especially valuable—it reinforced how Vue rendering works and why component boundaries matter.

### Intentional Simplifications

- No computed properties yet
- No watchers
- No async state normalization
- No optimistic updates beyond basic array replacement
- No form validation libraries

This kept cognitive load manageable.

### Strong Next-Project Frontend Upgrades

For the next project, natural improvements would be:

- Add pagination support in the store and UI
- Extract API calls into a dedicated API layer
- Add basic form validation (client-side)
- Improve loading and disabled states during requests
- Add unit tests for stores with Vitest
- Introduce more deliberate component communication patterns
- Handle empty states explicitly (no notes, no results)

---

This project is a strong foundation. The next one should reuse the same patterns, add one or two deliberate upgrades (pagination and query abstraction are good candidates), and move faster because the mental groundwork is now in place.
