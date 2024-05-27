import express from "express";
import { bookTimeSlot, createReview, getApiKey, getBookings, getGroundById, getGrounds, getOrderbyUser, userLogin, userSignup } from "../controllers/userController.js";
import { authenticateJWT } from "../utils/jwtAuth.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/grounds', getGrounds);
router.get('/ground/:id', getGroundById);
router.post('/book-slot/:id', authenticateJWT, bookTimeSlot);
router.get('/bookings', authenticateJWT, getBookings);
router.get('/api-key', getApiKey);
router.post("/create-order",createOrder) 
router.get('/get-orders/:id', authenticateJWT, getOrderbyUser);
router.post("/create-feedback",createReview) 




export default router;