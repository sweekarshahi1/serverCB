import mongoose from "mongoose";

const merchSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
    },
});

export const Merch = mongoose.model('Merch', merchSchema);