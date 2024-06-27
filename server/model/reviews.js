const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required: true,
        min:1,
        max:5
    },
    review:{
        type: String,
        required: true
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }
},{
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;