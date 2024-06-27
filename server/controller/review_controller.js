const Review = require("../model/reviews");
const Movie = require("../model/movie");

module.exports.create = async (req, res)=>{
    try {
        const getMovie = await Movie.findById(req.params.id);
        if(!getMovie){
            return res.status(400).json({
                message: "movie not available or does not found"
            })
        }
        const newReview = await Review.create({
            rating: req.body.rating,
            review: req.body.review,
            movie: getMovie._id
        })
        getMovie.reviews.push(newReview._id);
        await getMovie.save();
        return res.status(200).json({
            message: "your review is here!",
            review: newReview
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in creating the review!",
            error: error.message
        })
    }
}

module.exports.update = async (req, res)=>{
    try {
        const findReview = await Review.findById(req.params.id);
        if(!findReview){
            return res.status(400).json({
                message: "review not found or does not exist"
            })
        }
        findReview.rating = req.body.rating,
        findReview.review = req.body.review
        await findReview.save();
        return res.status(200).json({
            message: "Your review updated successfully!",
            review: findReview
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in updating the review!",
            error: error.message
        })
    }
}
module.exports.getData = async (req, res)=>{
    try {
        const reviewData = await Review.findById(req.params.id);
        if(!reviewData){
            return res.status(400).json({
                message: "review not found or does not exist"
            })
        }
        return res.status(200).json({
            message: "Review data by id",
            review: reviewData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in getting the review!",
            error: error.message
        })
    }
}