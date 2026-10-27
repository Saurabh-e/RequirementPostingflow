import express from 'express';
import { body } from 'express-validator';
import {
  createRequirement,
  getRequirement,
  getAllRequirements,
} from '../controllers/requirementController';

const router = express.Router();

// Validation middleware
const createRequirementValidation = [
  body('eventName').notEmpty().withMessage('Event name is required'),
  body('eventType').notEmpty().withMessage('Event type is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['planner', 'performer', 'crew'])
    .withMessage('Category must be planner, performer, or crew'),
  body('contactPerson').notEmpty().withMessage('Contact person is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  
  // Conditional validation for planner
  body('plannerDetails.guestCount')
    .if(body('category').equals('planner'))
    .isInt({ min: 1 })
    .withMessage('Guest count must be a positive number'),
  
  // Conditional validation for performer
  body('performerDetails.numberOfPerformers')
    .if(body('category').equals('performer'))
    .isInt({ min: 1 })
    .withMessage('Number of performers must be a positive number'),
  
  // Conditional validation for crew
  body('crewDetails.numberOfMembers')
    .if(body('category').equals('crew'))
    .isInt({ min: 1 })
    .withMessage('Number of crew members must be a positive number'),
];

// Routes
router.post('/requirements', createRequirementValidation, createRequirement);
router.get('/requirements/:id', getRequirement);
router.get('/requirements', getAllRequirements);

export default router;
