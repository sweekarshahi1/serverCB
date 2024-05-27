import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    courtId: {
        type: Object,
        required: [true, "Court is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
});
export const feedback = mongoose.model('feedback', feedbackSchema);