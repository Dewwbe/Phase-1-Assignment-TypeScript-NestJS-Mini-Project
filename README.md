# 🚀 User Management API

A clean, scalable REST API built with **NestJS** and **TypeScript**, demonstrating strong backend fundamentals, validation, and clean architecture.

---

## 📌 Overview

This project implements a **User Management system** with full CRUD functionality.

### Key Features

- ✅ Strong TypeScript practices (strict mode, no `any`)
- ✅ Clean architecture (Controller → Service → DTO)
- ✅ DTO-based validation
- ✅ Centralized error handling
- ✅ Consistent API response structure
- ✅ Swagger API documentation
- ✅ Pagination support
- ✅ UUID validation
- ✅ Environment configuration
- ✅ Unit & E2E testing

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS |
| Language | TypeScript (strict mode) |
| Validation | class-validator, class-transformer |
| Documentation | Swagger |
| Config | @nestjs/config |
| Testing | Jest, Supertest |
| Runtime | Node.js |

---

## 📁 Project Structure

```
src/
├── main.ts
├── app.module.ts
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── interfaces/
│       └── api-response.interface.ts
└── users/
    ├── dto/
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    ├── interfaces/
    │   └── user.interface.ts
    ├── users.controller.ts
    ├── users.service.ts
    └── users.module.ts

test/
├── app.e2e-spec.ts
└── users.service.spec.ts

.env.example
.gitignore
```

---

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone <your-repo-url>
cd user-management-api
```

**2. Install dependencies**

```bash
npm install
```

**3. Install required packages**

```bash
npm install class-validator class-transformer @nestjs/swagger swagger-ui-express @nestjs/config
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

A sample file is provided as `.env.example`.

> ⚠️ Do not commit `.env` to Git (already ignored via `.gitignore`)

---

## ▶️ Running the Application

**Development**

```bash
npm run start:dev
```

**Production**

```bash
npm run build
npm run start
```

---

## 🌐 Application URLs

| Service | URL |
|---|---|
| API | http://localhost:3000 |
| Swagger UI | http://localhost:3000/api |

---

## 📬 API Endpoints

### ➕ Create User

```
POST /users
```

```json
{
  "firstName": "Alice",
  "lastName": "Perera",
  "email": "alice@example.com",
  "age": 24,
  "isActive": true
}
```

### 📥 Get All Users (with Pagination)

```
GET /users?page=1&limit=10
```

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

### 🔍 Get User by ID

```
GET /users/:id
```

### ✏️ Update User (Partial)

```
PATCH /users/:id
```

```json
{
  "firstName": "Updated Name",
  "isActive": false
}
```

### ❌ Delete User

```
DELETE /users/:id
```

### ❤️ Health Check

```
GET /health
```

```json
{
  "status": "ok"
}
```

---

## 📦 Sample Success Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid",
    "firstName": "Alice",
    "lastName": "Perera",
    "email": "alice@example.com",
    "age": 24,
    "isActive": true,
    "createdAt": "2026-04-06T10:00:00.000Z",
    "updatedAt": "2026-04-06T10:00:00.000Z"
  }
}
```

---

## ⚠️ Validation Rules

| Field | Rule |
|---|---|
| `firstName` | required, string, min 2, max 50 |
| `lastName` | required, string, min 2, max 50 |
| `email` | required, valid email |
| `age` | required, integer, minimum 18 |
| `isActive` | optional boolean |

### 🆔 ID Validation

All endpoints using `:id` require a **valid UUID**.

> Invalid UUID → `400 Bad Request`

---

## ❗ Error Handling

A global `HttpExceptionFilter` ensures consistent error responses.

```json
{
  "success": false,
  "message": "User with id \"...\" not found",
  "timestamp": "2026-04-06T10:05:00.000Z",
  "path": "/users/:id"
}
```

---

## 📘 API Documentation (Swagger)

Access Swagger UI at: `http://localhost:3000/api`

Features:
- Interactive API testing
- Request/response schemas
- Validation rules

---

## 🧪 Testing

**Run unit tests**

```bash
npm run test
```

**Run e2e tests**

```bash
npm run test:e2e
```

**Run coverage**

```bash
npm run test:cov
```

**Test Files**

| File | Purpose |
|---|---|
| `users.service.spec.ts` | Unit tests |
| `app.e2e-spec.ts` | Endpoint tests |

---

## 🧹 Linting

```bash
npm run lint
```

Ensures:
- Clean code
- No unused variables
- TypeScript best practices

---

## 🧠 Design Principles

- ✅ Thin controllers (no business logic)
- ✅ Service layer handles all logic
- ✅ DTO-based validation
- ✅ Strict TypeScript (no `any`)
- ✅ Separation of concerns
- ✅ Consistent API responses

---

## ⚠️ Limitations

- In-memory data storage
- Data resets on server restart
- No authentication or authorization

---

## 🚧 Future Improvements

- [ ] PostgreSQL + Prisma integration
- [ ] JWT authentication
- [ ] Advanced pagination & filtering
- [ ] Role-based access control
- [ ] Docker support

---

## 🔗 Development Workflow

1. Start the server
2. Open Swagger at `http://localhost:3000/api`
3. Test endpoints via Swagger or Postman
4. Validate edge cases (invalid input, duplicates, etc.)
5. Run tests

---

## 👨‍💻 Author

Built as part of a TypeScript + NestJS backend learning project.
