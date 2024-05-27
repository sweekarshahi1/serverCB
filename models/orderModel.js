import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    cart:{
        type: Object,
        required: true,
    },
    user:{
        type: Object,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    paymentInfo:{
        type:String,
    },
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    khaltiPIDX:{
        type:String,
    }
});

export const Order = mongoose.model("Order", orderSchema);