🚀 User Management API

A clean, production-style REST API built with NestJS and TypeScript, designed to demonstrate strong backend fundamentals including validation, modular architecture, and maintainable code practices.

📌 Overview

This project implements a User Management system with full CRUD functionality, structured using NestJS best practices.

It focuses on:

Strong TypeScript usage (strict mode, no any)
Clean architecture (controllers → services → DTOs)
Input validation using DTOs
Consistent API response structure
Error handling using global filters
API documentation with Swagger
🛠 Tech Stack
Framework: NestJS
Language: TypeScript (strict mode)
Validation: class-validator, class-transformer
Documentation: Swagger
Runtime: Node.js
📁 Project Structure
src/
  main.ts
  app.module.ts

  common/
    filters/
      http-exception.filter.ts
    interfaces/
      api-response.interface.ts

  users/
    dto/
      create-user.dto.ts
      update-user.dto.ts
    interfaces/
      user.interface.ts
    users.controller.ts
    users.service.ts
    users.module.ts
⚙️ Installation
1. Clone the repository
git clone <your-repo-url>
cd user-management-api
2. Install dependencies
npm install
3. Install required packages
npm install class-validator class-transformer @nestjs/mapped-types @nestjs/swagger swagger-ui-express
▶️ Running the Application
Development mode
npm run start:dev
Production build
npm run build
npm run start
🌐 Application URLs
Service	URL
API	http://localhost:3000

Swagger UI	http://localhost:3000/api
📬 API Endpoints
➕ Create User
POST /users
{
  "firstName": "Alice",
  "lastName": "Perera",
  "email": "alice@example.com",
  "age": 24,
  "isActive": true
}
📥 Get All Users
GET /users
🔍 Get User by ID
GET /users/:id
✏️ Update User (Partial)
PATCH /users/:id
{
  "firstName": "Updated Name",
  "isActive": false
}
❌ Delete User
DELETE /users/:id
📦 Sample API Response
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
⚠️ Validation Rules
Field	Rule
firstName	string, min length 2
lastName	string, min length 2
email	valid email
age	integer, minimum 18
isActive	optional boolean
🧪 Testing with Postman
Base URL
http://localhost:3000
Example: Create User
Method: POST
URL: /users
Body → raw → JSON
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 25
}
❗ Error Handling

The application uses a global exception filter to standardize error responses.

Example Error Response
{
  "success": false,
  "message": [
    "email must be an email",
    "age must not be less than 18"
  ],
  "timestamp": "2026-04-06T10:05:00.000Z",
  "path": "/users"
}
🧠 Design Principles
✅ Thin controllers (no business logic)
✅ Service layer handles all logic
✅ DTO-based validation
✅ Strict TypeScript (no any)
✅ Clear separation of concerns
✅ Consistent API response format
⚠️ Limitations
In-memory data storage (no database)
Data resets on server restart
No authentication or authorization
🚧 Future Improvements
Add PostgreSQL with Prisma
Add authentication (JWT)
Add pagination & filtering
Add unit & e2e tests
Add environment config (.env)
Dockerize application
🔗 Development Workflow
Start server
Open Swagger UI
Test endpoints via Swagger or Postman
Validate edge cases (invalid input, duplicate email, etc.)
👨‍💻 Author

Built as part of a TypeScript + NestJS backend learning project.

⭐ Notes

This project is intentionally designed to emphasize clean backend practices rather than complexity.
It serves as a strong foundation for scaling into production-grade systems.
