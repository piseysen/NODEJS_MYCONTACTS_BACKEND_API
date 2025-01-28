# MyContacts Backend

A RESTful API backend for managing contacts built with Express.js and MongoDB.

## Features

- User authentication and authorization
- CRUD operations for contacts
- Error handling middleware
- MongoDB integration
- JWT token-based authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a .env file with the following variables:
```
PORT=5001
CONNECTION_STRING=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/current - Get current user info

### Contacts
- GET /api/contacts - Get all contacts
- POST /api/contacts - Create new contact
- GET /api/contacts/:id - Get contact by ID
- PUT /api/contacts/:id - Update contact
- DELETE /api/contacts/:id - Delete contact

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Error Handling

The application includes centralized error handling with appropriate HTTP status codes and error messages.

## Security Features

- Password hashing
- JWT authentication
- Request validation
- Protected routes
- Rate limiting

## License

MIT License
