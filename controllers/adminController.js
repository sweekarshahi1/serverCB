import { Admin } from "../models/adminModel.js";
import { Ground } from "../models/groundModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Booking } from "../models/bookingModel.js";
import { Merch } from '../models/merchModel.js';
import { User } from "../models/userModel.js";
import { Order } from "../models/orderModel.js";
// import catchAsyncErros from "../middleware/catchAsyncErros.js";

//*************** admin registration ***************//
export const createAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //validation for existing admin
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({
                message: 'Admin already exists',
                success: false,
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //saving admin to db
        const admin = new Admin({
            username: username,
            email: email,
            password: hashedPassword,
        });
        await admin.save();

        const token = jwt.sign({ email, role: 'admin' }, process.env.SECRET, { expiresIn: '1d' }); //created this token so that user can login upon signing up
        return res.status(200).send({
            message: "Admin created",
            success: true,
            admin,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error registering admin",
            success: false,
            error,
        });
    }
}

//*************** admin login ***************//
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).send({
                message: "user not found",
                success: false,
            });
        }

        //compare password
        const matchPassword = await bcrypt.compare(password, admin.password);
        if (!matchPassword) {
            return res.status(401).send({
                message: "Incorrect password",
                success: false,
            });
        }

        //create token and login
        const token = jwt.sign({ email, role: "admin" }, process.env.SECRET, { expiresIn: '1d' });
        res.status(200).send({
            message: "login successful",
            success: true,
            token,
            admin,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error logging in",
            success: false,
            error,
        });
    }
}
// merch
export const getAllMerchandise = async (req, res) => {
    try {
        const merchandise = await Merch.find({});
        res.status(200).send({
            success: true,
            merchandise,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            message: "Failed to fetch merchandise",
            success: false,
            error,
        });
    }
}

//*************** create ground ***************//
export const createGround = async (req, res) => {
    try {
        const newGround = req.body;
        console.log(req.body)
        // const convertedLatitude = parseFloat(newGround.coordinates.latitude)
        // const convertedLongitude = parseFloat(newGround.coordinates.longitude)
        // newGround.coordinates.latitude = convertedLatitude
        // newGround.coordinates.longitude = convertedLongitude
        console.log(newGround)
        const ground = new Ground(newGround);
        await ground.save()

        res.status(200).send({
            message: "Ground creation successful",
            success: true,
            ground,
            groundId: ground.id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "error creating ground",
            success: false,
            error,
        });
    }
}

//Merch display
export const getMerchandise = async (req, res) => {
    try {
        const merchandise = await Merch.find();
        res.status(201).send({
            success: true,
            merchandise,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            message: "Failed to fetch merchandise",
            success: false,
            error,
        });
    }
}

//*************** get all ground details ***************//
export const getAllGrounds = async (req, res) => {
    try {
        const grounds = await Ground.find({});
        res.status(200).send({
            success: true,
            grounds,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No grounds added",
            success: false,
            error,
        });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).send({
            success: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No Orders found",
            success: false,
            error,
        });
    }
}



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({
            success: true,
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: ("No Error->",error),
            success: false,
            error,
        });
    }
}

//Get grounds by Vendors
export const getGroundByVendor = async (req, res) => {
    try {
        const vendorId = req.params.id
        console.log(vendorId)
        const ground = await Ground.find({
            "vendorId": vendorId,
          });
        res.status(201).send({
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "ground not found",
            success: false,
            error,
        });
    }
}



//*************** fetch ground by id ***************//
export const fetchGroundById = async (req, res) => {
    try {
        const groundId = req.params.id;
        const ground = await Ground.findById(groundId);
        res.status(201).send({
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "ground not found",
            success: false,
            error,
        });
    }
}
//*************** update ground details ***************//
export const updateGround = async (req, res) => {
    try {
        let updateGround;
        updateGround = await Ground.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        if (!updateGround) {
            return res.status(404).send({
                message: "ground not found",
                success: false,
            });
        }
        res.status(201).send({
            message: "Ground updated",
            success: true,
            ground: updateGround,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "error updating",
            success: false,
            error,
        });
    }
}

//*************** delete ground details ***************//
export const deleteGround = async (req, res) => {
    try {
        const groundId = req.params.id;
        const ground = await Ground.findByIdAndDelete(groundId);
        if (!ground) {
            return res.status(400).send({
                message: "ground not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Ground deleted",
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Error deleting ground details",
            success: false,
            error,
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(400).send({
                message: "User not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "User deleted",
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Error deleting user",
            success: false,
            error,
        });
    }
}

//*************** get all bookings ***************//
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).send({
            success: true,
            bookings,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "No bookings found",
            success: false,
            error,
        });
    }
}

//*************** fetch ground by id ***************//
export const fetchGroundFeedbacks = async (req, res) => {
    try {
        const groundId = req.params.id;
        const ground = await Ground.findById(groundId);
        res.status(201).send({
            success: true,
            ground,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "ground not found",
            success: false,
            error,
        });
    }
}

