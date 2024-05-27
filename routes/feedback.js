import express from 'express';
import { Feedback } from '../models/merchModel.js';

const router = express.Router();


const createFeedbackRoutes = async (req, res) => {
  try {
    // Extract data from request body
    const { userID, description, groundID } = req.body;


    const newfeedback = new Merch({
      userID,
      description,
      groundID,
    });

    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Posted' });
  } catch (error) {
    // Handle errors
    console.error('Error posting feedback:', error);
    res.status(500).json({ success: false, error: 'Failed to Post' });
  }
};

export default createMerchandiseRoute;