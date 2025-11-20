# Svelte Demo SCR - School Registry System

A SvelteKit demo application for managing students and teachers with CRUD operations, filtering, inline editing, and localStorage persistence (with a toggle switch).

## Features

- **Student & Teacher Management** - Add, edit, delete, and filter records
- **Data Persistence** - Automatic localStorage with sample data generation
- **Inline Editing** - Edit records directly in tables
- **Input Validation** - Form validation with error messages
- **Responsive Design** - Mobile-friendly interface

## Installation

```bash
git clone https://github.com/DavidePlessi/svelte-demo-scr.git
cd scr-tinental
npm install
```

## Usage

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm run preview
```

## Tech Stack

- SvelteKit v2.47.1
- TypeScript v5.9.3
- TailwindCSS v4.1.17
- Vite v7.1.10

## Project Structure

```
src/
├── lib/
│   ├── components/     # EntityForm, EntityTable, Navbar
│   ├── services/       # Base service with CRUD operations
│   ├── types.ts        # TypeScript interfaces
│   └── errors.ts       # Error handling
│   └── stores.ts       # LocalStorageEnabled store
│   └── utils.ts        # Utility functions
└── routes/
    ├── students/       # Student management
    └── teachers/       # Teacher management
```

## Links

- [GitHub Repository](https://github.com/DavidePlessi/svelte-demo-scr.git)
- [SvelteKit Docs](https://kit.svelte.dev/)

---

Built with SvelteKit
