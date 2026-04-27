# 🚀 User Management API (Phase 2 – Production Backend)

A scalable, production-ready REST API built with NestJS, Prisma, and PostgreSQL, featuring JWT authentication, role-secured endpoints, and comprehensive testing.

---

## 📌 Overview

This project is an enhanced version of the initial user management system, upgraded to include:

- 🔐 Authentication & Authorization (JWT)
- 🗄 Database integration (PostgreSQL + Prisma)
- 📝 Notes management (user-based resource ownership)
- 🧪 Unit & End-to-End testing
- 📘 Swagger API documentation

---

## ✨ Key Features

- ✅ JWT-based authentication
- ✅ Protected routes using Guards
- ✅ Password hashing with bcrypt
- ✅ Prisma ORM with PostgreSQL
- ✅ User–Note relational data model
- ✅ DTO validation with class-validator
- ✅ Global exception handling
- ✅ Consistent API response format
- ✅ Pagination & filtering
- ✅ Swagger documentation
- ✅ Unit testing (Jest)
- ✅ E2E testing (Supertest)

---

## 🛠 Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Framework  | NestJS              |
| Language   | TypeScript          |
| Database   | PostgreSQL          |
| ORM        | Prisma              |
| Auth       | JWT + Passport      |
| Validation | class-validator     |
| Testing    | Jest + Supertest    |
| Docs       | Swagger             |

---

## 📁 Project Structure
src/
├── auth/                # Authentication (JWT)
├── users/               # User module
├── notes/               # Notes module
├── prisma/              # Prisma service
├── common/              # Filters, interceptors
├── config/              # Env validation
├── app.module.ts
├── main.ts
test/
├── app.e2e-spec.ts      # E2E tests
├── users.service.spec.ts
├── notes.service.spec.ts

---

## 🔐 Authentication Flow

1. User registers → password hashed using **bcrypt**
2. User logs in → **JWT token** generated
3. Token sent in header:
Authorization: Bearer <token>
4. Protected routes use `JwtAuthGuard`

---

## 🗄 Database Schema (Prisma)

**User**
- `id` (UUID)
- `email` (unique)
- `password` (hashed)
- `notes` (relation)

**Note**
- `id`
- `title`
- `content`
- `userId` (FK)

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/db"
JWT_SECRET="this_is_a_secure_secret_123"
JWT_EXPIRES_IN="1d"
NODE_ENV=development
```

---

## ▶️ Running the Application

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### 🌐 URLs

| Service | URL                          |
|---------|------------------------------|
| API     | http://localhost:3000        |
| Swagger | http://localhost:3000/api    |

---

## 📬 API Endpoints

### 🔐 Auth

| Method | Endpoint         | Description   |
|--------|------------------|---------------|
| POST   | /auth/register   | Register user |
| POST   | /auth/login      | Login user    |

### 👤 Users

| Method | Endpoint      |
|--------|---------------|
| GET    | /users        |
| GET    | /users/:id    |
| PATCH  | /users/:id 🔒 |
| DELETE | /users/:id 🔒 |

### 📝 Notes

| Method | Endpoint              |
|--------|-----------------------|
| POST   | /notes 🔒             |
| GET    | /notes                |
| GET    | /notes/:id            |
| GET    | /notes/user/:userId   |
| PATCH  | /notes/:id 🔒         |
| DELETE | /notes/:id 🔒         |

> 🔒 = Requires JWT token

---

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

- ✔ Tests service logic using mocked Prisma
- ✔ Example: `UsersService`, `NotesService`

### Run E2E Tests

```bash
npm run test:e2e
```

- ✔ Tests full system (API → DB → Auth → Response)

### E2E Test Coverage

- ✔ Register user
- ✔ Duplicate email rejection (409)
- ✔ Login user
- ✔ Unauthorized access (401)
- ✔ Authorized access with JWT
- ✔ Create note
- ✔ Get notes
- ✔ Update note
- ✔ Delete note

### ⚠️ Important Testing Behavior

During E2E tests, you may see logs like:
409 Conflict (duplicate email)
401 Unauthorized

These are **expected** and verify:
- ✔ Error handling works
- ✔ JWT protection works

---

## 📘 Swagger API Docs

**URL:** http://localhost:3000/api

Features:
- Interactive testing
- Request validation
- JWT authentication testing

---

## 📦 Sample Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "john@example.com"
    }
  }
}
```

---

## 🔒 Security Features

- Password hashing (bcrypt)
- JWT authentication
- Protected routes
- Input validation
- Ownership validation (notes)

---

## 🧠 Design Principles

- Thin controllers
- Service-based logic
- DTO validation
- Separation of concerns
- Clean architecture
- Production-ready structure

---

## 🚀 Improvements from Phase 1

| Feature              | Phase 1       | Phase 2         |
|----------------------|---------------|-----------------|
| Database             | ❌ In-memory   | ✅ PostgreSQL    |
| Auth                 | ❌ None        | ✅ JWT           |
| Security             | ❌             | ✅ Guards        |
| Relationships        | ❌             | ✅ User–Notes    |
| Testing              | Basic          | Full E2E        |
| Production readiness | ❌             | ✅               |

---

## 🎤 Viva Explanation (Short)

This is a production-ready NestJS backend with JWT authentication, Prisma ORM, and PostgreSQL. It includes secure endpoints, user-note relationships, validation, and full unit and E2E testing using Jest and Supertest.

---

## 👨‍💻 Author

Built as part of **Efutures Phase 2 Backend Development Assignment**.
