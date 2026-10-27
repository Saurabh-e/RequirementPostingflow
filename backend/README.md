# Event Requirements Backend

Express.js and MongoDB backend API for the Event Requirements Application.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- express-validator
- CORS
- dotenv

## Setup

### Prerequisites
- Node.js v18+
- MongoDB installed and running

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-requirements
   NODE_ENV=development
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

### CORS

Set `FRONTEND_URL` in Render to the exact production frontend URL (for example,
`https://your-app.vercel.app`). The API also allows `http://localhost:5173` for
local development. CORS is restricted to these origins; production startup
requires `FRONTEND_URL`. Requests may use `GET`, `POST`, `PUT`, `PATCH`,
`DELETE`, and `OPTIONS`, with `Content-Type` and `Authorization` headers.
Preflight requests are handled by the CORS middleware before API routes.

## API Endpoints

### Health Check
```
GET /health
```

### Create Event Requirement
```
POST /api/requirements
Content-Type: application/json

{
  "eventName": "string",
  "eventType": "string",
  "location": "string",
  "category": "planner" | "performer" | "crew",
  "contactPerson": "string",
  "email": "string",
  "phone": "string",
  // Category-specific fields...
}
```

### Get Single Requirement
```
GET /api/requirements/:id
```

### Get All Requirements
```
GET /api/requirements?category=planner&page=1&limit=10
```

## Data Model

### EventRequirement Schema

```typescript
{
  eventName: string (required)
  eventType: string (required)
  eventDate?: Date
  eventDateRange?: {
    startDate: Date
    endDate: Date
  }
  location: string (required)
  venue?: string
  category: 'planner' | 'performer' | 'crew' (required)
  
  // Category-specific details
  plannerDetails?: {
    eventScale: string
    guestCount: number
    planningServices: string[]
    budget: string
    planningStage: string
  }
  performerDetails?: {
    performerType: string
    genre: string
    numberOfPerformers: number
    duration: string
    budget: string
    equipment: string[]
  }
  crewDetails?: {
    crewRoles: string[]
    numberOfMembers: number
    experienceLevel: string
    shiftDuration: string
    budget: string
  }
  
  contactPerson: string (required)
  email: string (required)
  phone: string (required)
  preferredTime?: string
  additionalNotes?: string
  
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## Validation

The API validates:
- Required fields presence
- Email format
- Category enum values
- Conditional required fields based on category
- Numeric field types and ranges

## Error Handling

All errors return JSON:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Development

### Project Structure
```
src/
├── config/
│   └── database.ts       # MongoDB connection
├── models/
│   └── EventRequirement.ts   # Mongoose schema
├── routes/
│   └── requirementRoutes.ts  # API routes
├── controllers/
│   └── requirementController.ts  # Business logic
└── server.ts            # Express app setup
```

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server

## Testing with MongoDB

Connect to MongoDB and verify data:
```bash
mongosh
use event-requirements
db.eventrequirements.find().pretty()
```
