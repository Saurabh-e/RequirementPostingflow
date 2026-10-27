# Event Requirements Frontend

Next.js frontend application for posting event requirements with a multi-step wizard form.

## Technology Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation
- Axios

## Setup

### Installation

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

3. Configure environment variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Deploying to Vercel

1. Import the GitHub repository containing this project into Vercel.
2. Set the project **Root Directory** to `frontend`. Vercel should detect
   Next.js and use `npm install` and `npm run build`.
3. Add `NEXT_PUBLIC_API_URL` to the Vercel project's Production environment.
   Set it to the deployed Render API URL including `/api`, for example
   `https://your-backend.onrender.com/api`. Do not include a trailing slash.
4. Deploy or redeploy after setting the environment variable. `NEXT_PUBLIC_*`
   values are embedded into the frontend at build time.
5. In Render, set `FRONTEND_URL` to the exact Vercel production origin, for
   example `https://your-app.vercel.app` (origin only, without a path). This
   must match the domain users visit.

The production build fails if `NEXT_PUBLIC_API_URL` is missing, rather than
silently sending browser requests to localhost. Local development continues to
default to `http://localhost:5000/api`.

## Features

### Multi-Step Wizard Form

**Step 1: Event Basics**
- Event name
- Event type
- Event date (optional)
- Location
- Venue (optional)
- Category selection (Planner, Performer, Crew)

**Step 2: Category-Specific Requirements**

Dynamic fields based on selected category:

*Planner:*
- Event scale
- Guest count
- Planning services (multi-select)
- Budget range
- Planning stage

*Performer:*
- Performer type
- Genre
- Number of performers
- Performance duration
- Equipment (multi-select)
- Budget range

*Crew:*
- Crew roles (multi-select)
- Number of members
- Experience level
- Shift duration
- Budget range

**Step 3: Additional Details**
- Contact person
- Email
- Phone
- Preferred contact time
- Additional notes

**Step 4: Review & Submit**
- Complete summary
- Edit functionality for each section
- Submit to API

### Other Features

- Form validation with immediate feedback
- Progress indicator
- Loading states
- Error handling
- Duplicate submission prevention
- Responsive design
- Success page with requirement ID
- Requirements listing page
- Category filtering
- Pagination

## Project Structure

```
app/
├── page.tsx              # Main form wizard
├── success/page.tsx      # Success confirmation
├── requirements/page.tsx # Requirements list
├── layout.tsx
└── globals.css

components/
├── ProgressBar.tsx
├── Step1EventBasics.tsx
├── Step2CategoryRequirements.tsx
├── Step3AdditionalDetails.tsx
└── Step4Review.tsx

lib/
├── api.ts                # API client
└── validationSchemas.ts  # Zod schemas

types/
└── index.ts              # TypeScript types
```

## Form Validation

Validation is implemented using React Hook Form and Zod:

- Client-side validation with immediate feedback
- Required field validation
- Email format validation
- Phone number validation
- Conditional validation based on category
- Array minimum length validation (multi-selects)

## API Integration

The frontend communicates with the backend API using Axios:

```typescript
// Create requirement
POST /api/requirements

// Get single requirement
GET /api/requirements/:id

// Get all requirements with filters
GET /api/requirements?category=planner&page=1&limit=10
```

## Styling

Tailwind CSS is used for styling with:
- Responsive design (mobile-first)
- Custom color scheme
- Gradient backgrounds
- Smooth transitions
- Focus states
- Loading states

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
