# Task Management API

A RESTful API built with Node.js and Express for managing tasks with user authentication. The API follows a clean architecture pattern and implements comprehensive error handling.

## Features

- User authentication with JWT
- Complete CRUD operations for tasks
- Pagination and search functionality
- Error handling and logging
- MongoDB integration
- Clean architecture (Controller-Service-Repository pattern)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- morgan
- dotenv

## Project Structure

```
task-management-api/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Task.js
│   └── User.js
├── repositories/
│   ├── taskRepository.js
│   └── userRepository.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── services/
│   ├── authService.js
│   └── taskService.js
├── utils/
│   └── error.js
├── .env
├── .gitignore
├── server.js
└── package.json
```

## Architecture and Approach

The project follows a clean architecture pattern with the following layers:

1. **Controllers**: Handle HTTP requests/responses

   - Input validation
   - Request parsing
   - Response formatting

2. **Services**: Contain business logic

   - Task management operations
   - Authentication logic
   - Data validation

3. **Repositories**: Handle database operations

   - CRUD operations
   - Database queries
   - Data persistence

4. **Models**: Define data structures

   - MongoDB schemas
   - Data validation rules
   - Relationships

5. **Middleware**:
   - Authentication verification
   - Error handling
   - Request logging

### Error Handling

The application implements a comprehensive error handling system:

- Custom error classes for different types of errors
- Centralized error handling middleware
- Detailed error messages in development
- Sanitized error responses in production

### Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Input validation
- Error message sanitization

## Getting Started

### Prerequisites

- Node.js v18
- MongoDB v7
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Rishabh-Kumar01/botspot-ai-assignment-rishabh-kumar.git
cd botspot-ai-assignment-rishabh-kumar
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager-rishabh-kumar
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the server:

```bash
npm start
```

## API Documentation

### Authentication Endpoints

#### Register New User

- **POST** `/api/auth/register`

```json
{
  "username": "rishabh",
  "email": "rishabh@example.com",
  "password": "password123"
}
```

#### Login User

- **POST** `/api/auth/login`

```json
{
  "email": "rishabh@example.com",
  "password": "password123"
}
```

### Task Endpoints

All task endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

#### Create Task

- **POST** `/api/tasks`

```json
{
  "title": "Complete Project",
  "description": "Finish the task management API",
  "status": "Pending"
}
```

#### Get All Tasks

- **GET** `/api/tasks`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search tasks by title or description

#### Get Task by ID

- **GET** `/api/tasks/:id`

#### Update Task

- **PUT** `/api/tasks/:id`

```json
{
  "title": "Updated Task Title",
  "status": "In Progress"
}
```

#### Delete Task

- **DELETE** `/api/tasks/:id`

## Postman Collection

You can test the API using the Postman url or Postman collection:
[Task Management API Collection](./BotSpot%20AI%20Task%20Manager%20Assignment%20Rishabh%20Kumar.postman_collection.json)

To use the collection:

1. Import it into Postman
2. Create an environment with variables:
   - `baseUrl`: Your API base URL (e.g., `http://localhost:3000`)
   - `token`: Will be automatically set after login. If getting `Not Authorized` even after login, set the token manually in the API requests. Copy the token variable from the Environment. By selecting Bearer Token under Authorization and pasting the token in the token field.
