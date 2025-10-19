# Quick Start Guide

## 1. Start Backend

```bash
cd backend
npm run dev
```

Backend will start on `http://localhost:3001`

Test health check:
```bash
curl http://localhost:3001/api/health
```

## 2. Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will start on `http://localhost:3000`

## 3. Test the Application

1. Open browser: `http://localhost:3000`
2. Click "Check Backend Health" button
3. You should see backend and database status

## Adding New Features (3-Layer Architecture)

### Step 1: Create Database Table

Use Neon MCP or create SQL migration:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Step 2: Create Repository (Data Layer)

File: `backend/src/data/repositories/user.repository.ts`

```typescript
import pool from '../db/pool';

export class UserRepository {
  async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  async create(data: { name: string; email: string }) {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [data.name, data.email]);
    return result.rows[0];
  }
}

export default new UserRepository();
```

### Step 3: Create Service (Business Layer)

File: `backend/src/core/user.service.ts`

```typescript
import { z } from 'zod';
import userRepository from '../data/repositories/user.repository';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export class UserService {
  async getAll() {
    return await userRepository.findAll();
  }

  async create(data: any) {
    const validated = createUserSchema.parse(data);
    return await userRepository.create(validated);
  }
}

export default new UserService();
```

### Step 4: Create Routes (Presentation Layer)

File: `backend/src/app/routes/user.routes.ts`

```typescript
import { Router } from 'express';
import userService from '../../core/user.service';

const router = Router();

router.get('/users', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Step 5: Register Routes

File: `backend/src/app/routes/index.ts`

```typescript
import userRouter from './user.routes';

router.use('/api', userRouter);
```

### Step 6: Create Frontend Page

File: `frontend/pages/users.vue`

```vue
<template>
  <div class="container">
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { fetchApi } = useApi()
const users = ref([])

onMounted(async () => {
  const result = await fetchApi('/users')
  if (result.success) {
    users.value = result.data
  }
})
</script>
```

## Project Structure Summary

```
backend/
  src/
    app/routes/        ← HTTP endpoints (Presentation)
    core/              ← Business logic (Business)
    data/repositories/ ← Database queries (Data)
    middleware/        ← Auth, validation, errors
    types/             ← Shared types

frontend/
  pages/              ← Nuxt pages (auto-routing)
  components/         ← Vue components
  composables/        ← Reusable logic (like useApi)
```

## Common Commands

### Backend
```bash
npm run dev      # Development with hot reload
npm run build    # Compile TypeScript
npm run start    # Run production
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `NUXT_PUBLIC_API_BASE` - Backend API URL

## Troubleshooting

**Backend won't start:**
- Check if `.env` file exists
- Verify `DATABASE_URL` is correct
- Check if port 3001 is available

**Frontend won't connect:**
- Ensure backend is running
- Check `NUXT_PUBLIC_API_BASE` in frontend/.env
- Verify CORS settings in backend

**Database errors:**
- Verify Neon project is active
- Check connection string has correct credentials
- Test connection with health check endpoint
