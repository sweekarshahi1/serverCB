import express from "express";
import { adminLogin, createAdmin, createGround, deleteGround, deleteUser, fetchGroundById, getAllGrounds, getAllOrders, getAllUsers, getBookings, getGroundByVendor, updateGround } from "../controllers/adminController.js";
import { authenticateJWT } from "../utils/jwtAuth.js";
import { uploadImages } from "../utils/handleImgUpload.js";


const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);
router.post('/create-ground', authenticateJWT, createGround);
router.put('/update-ground/:id', authenticateJWT, updateGround);
router.get('/fetch-grounds', authenticateJWT, getAllGrounds);
router.get('/fetch-ground/:id', authenticateJWT, fetchGroundById);
router.delete('/delete-ground/:id', authenticateJWT, deleteGround);
router.get('/bookings', authenticateJWT, getBookings);
router.get('/get-grounds-vendor/:id',authenticateJWT,getGroundByVendor)
router.get('/get-all-user',authenticateJWT,getAllUsers)
router.delete('/delete-user/:id',authenticateJWT,deleteUser)
router.get('/get-all-order',authenticateJWT,getAllOrders)


export default router;