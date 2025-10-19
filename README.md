# FrontBack Project

Full-stack application with Nuxt (frontend), Express (backend), and PostgreSQL.

## Architecture

This project follows a **3-Layer Clean Architecture Pattern**:

```
Presentation Layer ← UI, pages, client-side state
Business Layer     ← API handlers, domain logic, validation
Data Layer         ← Database, external APIs, repositories
```

## Project Structure

```
frontback/
├── frontend/           # Nuxt 3 application
│   ├── pages/          # Vue pages (auto-routing)
│   ├── components/     # Vue components
│   ├── composables/    # Composable functions
│   ├── assets/         # Static assets
│   └── public/         # Public files
│
├── backend/            # Express API server
│   └── src/
│       ├── app/        # Presentation layer (routes)
│       ├── core/       # Business logic
│       ├── data/       # Data layer (DB, repositories)
│       ├── types/      # TypeScript types
│       └── middleware/ # Security, validation, error handling
│
└── CLAUDE.md          # Architecture guidelines
```

## Tech Stack

### Frontend
- **Nuxt 3** - Vue.js framework with SSR
- **Vue 3** - Composition API
- **TypeScript** - Type safety

### Backend
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** (Neon) - Database
- **pg** - PostgreSQL client
- **Zod** - Schema validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm

### Installation

1. **Install backend dependencies:**
```bash
cd backend
npm install
```

2. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

### Environment Setup

1. **Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://neondb_owner:npg_WF8CA5ItNBjm@ep-odd-meadow-a1tx55k2-pooler.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
FRONTEND_URL=http://localhost:3000
```

2. **Frontend** (`frontend/.env`):
```env
NUXT_PUBLIC_API_BASE=http://localhost:3001/api
```

### Running the Application

1. **Start the backend server:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:3001`

2. **Start the frontend dev server:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

3. **Test the connection:**
   - Open `http://localhost:3000`
   - Click "Check Backend Health" button
   - Should display backend and database status

## Database

### Neon PostgreSQL
- **Project ID:** gentle-leaf-69664848
- **Database:** neondb
- **Branch:** main

### Connection Pool
Backend uses connection pooling with:
- Max connections: 20
- Idle timeout: 30s
- Connection timeout: 2s

## API Endpoints

### Health Check
```
GET /api/health
```
Returns backend and database status.

## Development

### Backend Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm run start    # Run production build
```

### Frontend Scripts
```bash
npm run dev      # Start Nuxt dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run generate # Generate static site
```

## Security Features

- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation with Zod
- ✅ Environment variable validation
- ✅ SQL injection protection (parameterized queries)
- ✅ Global error handling
- ✅ Request logging

## Architecture Guidelines

See [CLAUDE.md](./CLAUDE.md) for detailed architecture principles and best practices.

## License

ISC
