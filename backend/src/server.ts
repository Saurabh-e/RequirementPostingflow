import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import requirementRoutes from './routes/requirementRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL?.trim();

if (process.env.NODE_ENV === 'production' && !frontendUrl) {
  throw new Error('FRONTEND_URL must be set in production.');
}

const allowedOrigins = new Set(['http://localhost:5173']);
if (frontendUrl) {
  let frontendOrigin: URL;
  try {
    frontendOrigin = new URL(frontendUrl);
  } catch {
    throw new Error('FRONTEND_URL must be a valid HTTP or HTTPS URL.');
  }

  if (!['http:', 'https:'].includes(frontendOrigin.protocol)) {
    throw new Error('FRONTEND_URL must use HTTP or HTTPS.');
  }
  allowedOrigins.add(frontendOrigin.origin);
}

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    callback(null, !origin || allowedOrigins.has(origin));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Register CORS before parsers and API routes so preflight requests are handled.
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', requirementRoutes);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
