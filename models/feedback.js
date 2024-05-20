import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Description is required"],
    },
});
export const feedback = mongoose.model('feedback', feedbackSchema);