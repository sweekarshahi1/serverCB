import mongoose from "mongoose";
import { bookingSchema } from "./bookingModel.js";

const groundSchema = new mongoose.Schema({
    ground_id:{
        
    },
    ground_name: {
        type: String,
        required: [true, "Name is required"],
    },
    location: {
        type: String,
        required: [true, "location is required"],

    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    shift:{
        type: String,
    },
    // coordinates: {
    //     latitude: {
    //         type: Number,
    //         required: [true, "required"],
    //     },
    //     longitude: {
    //         type: Number,
    //         required: [true, "required"],
    //     },
    // },
    availableSlots: [String],
    images: [String],
    bookings: [bookingSchema]

});

export const Ground = mongoose.model('Ground', groundSchema);