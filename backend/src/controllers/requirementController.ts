import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import EventRequirement from '../models/EventRequirement';

// Create a new event requirement
export const createRequirement = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Create new requirement
    const requirement = new EventRequirement(req.body);
    await requirement.save();

    res.status(201).json({
      success: true,
      message: 'Event requirement created successfully',
      data: {
        id: requirement._id,
        eventName: requirement.eventName,
        category: requirement.category,
      },
    });
  } catch (error: any) {
    console.error('Error creating requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating event requirement',
      error: error.message,
    });
  }
};

// Get a single requirement by ID
export const getRequirement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const requirement = await EventRequirement.findById(id);

    if (!requirement) {
      res.status(404).json({
        success: false,
        message: 'Event requirement not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (error: any) {
    console.error('Error fetching requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event requirement',
      error: error.message,
    });
  }
};

// Get all requirements with optional category filter and pagination
export const getAllRequirements = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, page = '1', limit = '10' } = req.query;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = {};
    if (category && ['planner', 'performer', 'crew'].includes(category as string)) {
      filter.category = category;
    }

    // Get total count for pagination
    const total = await EventRequirement.countDocuments(filter);

    // Get paginated results
    const requirements = await EventRequirement.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      data: requirements,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event requirements',
      error: error.message,
    });
  }
};
