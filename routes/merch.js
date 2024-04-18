import express from 'express';
import { Merch } from '../models/merchModel.js';

const router = express.Router();


const createMerchandiseRoute = async (req, res) => {
  try {
    // Extract data from request body
    const { productName, description, price, image } = req.body;


    const newMerch = new Merch({
      productName,
      description,
      price,
      image
    });


    await newMerch.save();
    res.status(201).json({ success: true, message: 'Merchandise created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating merchandise:', error);
    res.status(500).json({ success: false, error: 'Failed to create merchandise' });
  }
};

export default createMerchandiseRoute;