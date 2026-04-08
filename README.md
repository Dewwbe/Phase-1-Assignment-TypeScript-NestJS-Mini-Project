# 🚀 User Management API

A clean and scalable REST API built with **NestJS** and **TypeScript**, demonstrating strong backend fundamentals, validation, and clean architecture.

---

## 📌 Overview

This project implements a **User Management system** with full CRUD functionality.

It demonstrates:

- ✅ Strong TypeScript practices (strict mode, no `any`)
- ✅ Clean architecture (Controller → Service → DTO)
- ✅ DTO-based validation
- ✅ Centralized error handling
- ✅ Consistent API response structure
- ✅ Swagger API documentation

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS |
| Language | TypeScript (strict mode) |
| Validation | class-validator, class-transformer |
| Documentation | Swagger |
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
npm install class-validator class-transformer @nestjs/mapped-types @nestjs/swagger swagger-ui-express
```

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

### 📥 Get All Users

```
GET /users
```

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
| `firstName` | string, min length 2 |
| `lastName` | string, min length 2 |
| `email` | valid email |
| `age` | integer, minimum 18 |
| `isActive` | optional boolean |

---

## 🧪 Testing with Postman

**Base URL:** `http://localhost:3000`

**Example — Create User**

```
POST /users
```

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 25
}
```

---

## ❗ Error Handling

A global exception filter ensures consistent error responses across all endpoints.

```json
{
  "success": false,
  "message": [
    "email must be an email",
    "age must not be less than 18"
  ],
  "timestamp": "2026-04-06T10:05:00.000Z",
  "path": "/users"
}
```

---

## 🧠 Design Principles

- ✅ Thin controllers (no business logic)
- ✅ Service layer handles all logic
- ✅ DTO-based validation
- ✅ Strict TypeScript (no `any`)
- ✅ Clear separation of concerns
- ✅ Consistent API response format

---

## ⚠️ Limitations

- In-memory data storage (no database)
- Data resets on server restart
- No authentication or authorization

---

## 🚧 Future Improvements

- [ ] PostgreSQL + Prisma integration
- [ ] JWT authentication
- [ ] Pagination & filtering
- [ ] Unit & e2e tests
- [ ] Environment configuration (`.env`)
- [ ] Dockerize application

---

## 🔗 Development Workflow

1. Start the server
2. Open Swagger UI at `http://localhost:3000/api`
3. Test endpoints via Swagger or Postman
4. Validate edge cases (invalid input, duplicate email, etc.)

---

## 👨‍💻 Author

Built as part of a TypeScript + NestJS backend learning project.

---

> ⭐ This project focuses on clean backend practices and strong TypeScript fundamentals, making it a solid base for production-grade systems.
