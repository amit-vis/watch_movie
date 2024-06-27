import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createReview } from "../../redux/reducer/reviewreducer";

export const CreateReview = () => {
    const dispatch = useDispatch();
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState({ rating: "", review: "" });

    const handleCancel = () => {
        setReviewData({
            rating: "",
            review: ""
        });
    };

    const handleSubmit = async () => {
        try {
            const rating = parseInt(reviewData.rating, 10);
            if (rating < 1 || rating > 5) {
                toast.warn("Ratings should be between 1 and 5.");
                return;
            }
            const resultAction = await dispatch(createReview({
                movieId: movieId,
                review: { rating, review: reviewData.review }
            }));
            if (createReview.fulfilled.match(resultAction)) {
                toast.success("Your review was added successfully!");
                setReviewData({
                    rating: "",
                    review: ""
                });
                navigate(`/details/${movieId}`);
            } else {
                toast.error("An error occurred while adding the review.");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred while adding the review");
        }
    };

    return (
        <div className="main-container">
            <div className="form-container">
                <label htmlFor="review">Review:</label>
                <textarea
                    id="review"
                    name="review"
                    placeholder="Enter review..."
                    value={reviewData.review}
                    onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                ></textarea>

                <label htmlFor="rating">Ratings:</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    placeholder="Enter ratings.."
                    value={reviewData.rating}
                    onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                />

                <div className="btn-container">
                    <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};