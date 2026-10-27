# Event Requirements Application

A full-stack event requirement posting application built with Next.js (App Router), TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, and Mongoose.

## Features

### Frontend
- **Four-Step Wizard Form**
  - Step 1: Event Basics (name, type, date, location, venue, category selection)
  - Step 2: Category-Specific Requirements (dynamic fields based on selected category)
  - Step 3: Additional Details (contact information)
  - Step 4: Review & Submit (complete summary with edit options)
- Progress indicator
- Form validation using React Hook Form and Zod
- Responsive design with Tailwind CSS
- Loading states and error handling
- Duplicate submission prevention
- Success page with requirement ID
- Requirements listing page with category filtering and pagination

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- Input validation using express-validator
- Category-specific validation (planner, performer, crew)
- CORS enabled
- Error handling and logging
- Environment configuration

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod (validation)
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

```
event-requirements-app/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Main form page
│   │   ├── success/page.tsx         # Success confirmation page
│   │   ├── requirements/page.tsx    # Requirements listing page
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ProgressBar.tsx
│   │   ├── Step1EventBasics.tsx
│   │   ├── Step2CategoryRequirements.tsx
│   │   ├── Step3AdditionalDetails.tsx
│   │   └── Step4Review.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── validationSchemas.ts
│   ├── types/
│   │   └── index.ts
│   ├── .env.local
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── src/
    │   ├── config/
    │   │   └── database.ts
    │   ├── models/
    │   │   └── EventRequirement.ts
    │   ├── routes/
    │   │   └── requirementRoutes.ts
    │   ├── controllers/
    │   │   └── requirementController.ts
    │   └── server.ts
    ├── .env.example
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or remote instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-requirements
   NODE_ENV=development
   ```

5. Start MongoDB (if running locally):
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

6. Run the backend server:
   ```bash
   npm run dev
   ```

   The backend server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. Run the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`

2. Fill out the form:
   - **Step 1**: Enter event basics and select a category (Planner, Performer, or Crew)
   - **Step 2**: Fill in category-specific requirements
   - **Step 3**: Provide contact information
   - **Step 4**: Review your information and submit

3. After successful submission, you'll be redirected to a success page with your requirement ID

4. View all requirements at `http://localhost:3000/requirements`

## API Endpoints

### POST /api/requirements
Create a new event requirement

**Request Body:**
```json
{
  "eventName": "Summer Music Festival",
  "eventType": "Concert",
  "location": "Central Park, NYC",
  "category": "performer",
  "performerDetails": {
    "performerType": "band",
    "genre": "Rock",
    "numberOfPerformers": 5,
    "duration": "2hours",
    "budget": "5k-10k",
    "equipment": ["Sound System", "Lighting", "Stage"]
  },
  "contactPerson": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event requirement created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "eventName": "Summer Music Festival",
    "category": "performer"
  }
}
```

### GET /api/requirements/:id
Retrieve a specific requirement by ID

### GET /api/requirements
Get all requirements with optional filtering and pagination

**Query Parameters:**
- `category` (optional): Filter by category (planner, performer, crew)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

## Categories

### Planner
Fields: Event scale, guest count, planning services, budget, planning stage

### Performer
Fields: Performer type, genre, number of performers, duration, equipment, budget

### Crew
Fields: Crew roles, number of members, experience level, shift duration, budget

## Testing

### Test All Categories

1. **Test Planner Category:**
   - Select "Event Planner"
   - Fill in event scale, guest count (e.g., 150)
   - Select planning services
   - Choose budget and planning stage
   - Complete contact details and submit

2. **Test Performer Category:**
   - Select "Performer"
   - Choose performer type and genre
   - Enter number of performers (e.g., 4)
   - Select duration and equipment
   - Choose budget and submit

3. **Test Crew Category:**
   - Select "Crew"
   - Choose crew roles
   - Enter number of members (e.g., 10)
   - Select experience level and shift duration
   - Choose budget and submit

4. **Verify MongoDB Persistence:**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Switch to database
   use event-requirements
   
   # View all requirements
   db.eventrequirements.find().pretty()
   ```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the `MONGODB_URI` in your `.env` file
- Verify network connectivity if using a remote MongoDB instance

### Port Already in Use
- Change the `PORT` in backend `.env` file
- Update `NEXT_PUBLIC_API_URL` in frontend `.env.local` accordingly

### CORS Issues
- Ensure the backend CORS configuration allows requests from your frontend URL

## License


