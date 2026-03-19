# Phase 1 Wrapped as One Mini Project

## Project Title
User Management API — TypeScript Foundation Project

## Duration
3 weeks (2–5 hours per day)

## Goal
Build a NestJS CRUD API for users while demonstrating strong TypeScript fundamentals, clean architecture, and backend practices.

---

## Functional Requirements

### User CRUD
- Create user
- Get all users
- Get user by ID
- Update user (partial)
- Delete user

### User Fields
- id
- firstName
- lastName
- email
- age
- isActive
- createdAt
- updatedAt

---

## Validation Rules
- firstName: required, string, min length 2
- lastName: required, string, min length 2
- email: required, valid email
- age: required, integer, min 18
- isActive: optional (default true)

---

## TypeScript Rules
- strict mode enabled
- no `any`
- use DTOs properly
- use utility types where appropriate
- proper return types

---

## Project Structure

```
src/
  main.ts
  app.module.ts

  common/
    filters/
    interfaces/
    types/

  users/
    dto/
    interfaces/
    users.controller.ts
    users.service.ts
    users.module.ts
```

---

## Endpoints

- POST /users
- GET /users
- GET /users/:id
- PATCH /users/:id
- DELETE /users/:id

---

## Milestones

### Week 1
- Setup project
- Create DTOs and models
- Implement create + get all

### Week 2
- Complete CRUD
- Add validation + error handling

### Week 3
- Refactor
- Add response structure
- Prepare README

---

## README Requirements
- Setup instructions
- API endpoints
- Sample requests
- Design decisions
- Future improvements

---

## Rules
- No any
- Thin controllers
- Business logic in services
- Proper validation
- Clean structure

---

## Expected Outcome
- Strong TS understanding
- Clean NestJS structure
- Ready for backend contribution
