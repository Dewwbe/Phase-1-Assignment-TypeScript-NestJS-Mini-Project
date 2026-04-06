🚀 User Management API

A clean and scalable REST API built with NestJS and TypeScript, demonstrating strong backend fundamentals, validation, and clean architecture.

📌 Overview

This project implements a User Management system with full CRUD functionality.

It is designed to showcase:

Strong TypeScript practices (strict mode, no any)
Clean architecture (Controller → Service → DTO)
Validation using DTOs
Centralized error handling
Consistent API response structure
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
Development
npm run start:dev
Production
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
✏️ Update User
PATCH /users/:id
{
  "firstName": "Updated Name",
  "isActive": false
}
❌ Delete User
DELETE /users/:id
📦 Sample Success Response
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
age	integer, min 18
isActive	optional boolean
🧪 Testing (Postman)
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

A global exception filter ensures consistent error responses.

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
Thin controllers (no business logic)
Service layer handles all logic
DTO-based validation
Strict TypeScript (no any)
Separation of concerns
Consistent response format
⚠️ Limitations
In-memory data storage (no database)
Data resets on server restart
No authentication or authorization
🚧 Future Improvements
PostgreSQL + Prisma integration
JWT authentication
Pagination & filtering
Unit & e2e testing
Environment configuration
Docker support
🔗 Development Workflow
Start server
Open Swagger UI
Test endpoints via Swagger or Postman
Validate edge cases
👨‍💻 Author

Built as part of a TypeScript + NestJS backend learning project.

⭐ Notes

This project emphasizes clean backend practices and strong TypeScript fundamentals, making it a solid base for production-grade systems.
