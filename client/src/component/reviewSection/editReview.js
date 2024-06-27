import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editReview, getreviewData, reviewSelector } from "../../redux/reducer/reviewreducer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export const EditReview = () => {
    const dispatch = useDispatch();
    const {reviewId} = useParams();
    const reviews = useSelector(reviewSelector);
    const navigate = useNavigate();
    const [editReviews, setEditReviews] = useState({
        rating: "",
        review: ""
    })
    useEffect(()=>{
        if(reviewId){
            dispatch(getreviewData(reviewId))
        }
    },[dispatch, reviewId])

    useEffect(()=>{
        setEditReviews({
            rating: reviews.rating,
            review: reviews.review
        })
    },[reviews])

    const handleEditSubmit = async ()=>{
        try {
            const resultAction = await dispatch(editReview({
                reviewId: reviewId,
                review: editReviews
            }))

            if(editReview.fulfilled.match(resultAction)){
                toast.success("your data edited successfully!")
                setEditReviews({
                    rating: "",
                    review: ""
                })
                navigate(-1)
                dispatch(getreviewData(reviewId))
            }else{
                toast.error("Failed to update movie")
            }
        } catch (error) {
            console.log("An unexpected error occurred", error.message);
            toast.error("Failed to update movie");
        }
    }
    return (
        <div className="main-container">
            <div className="form-container">
                <label htmlFor="review">Review:</label>
                <textarea
                    id="review"
                    name="review"
                    placeholder="Enter review..."
                    value={editReviews.review}
                    onChange={(e)=>setEditReviews({...editReviews, review: e.target.value})}
                ></textarea>

                <label htmlFor="rating">Ratings:</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    placeholder="Enter ratings.."
                    value={editReviews.rating}
                    onChange={(e)=>setEditReviews({...editReviews, rating: e.target.value})}
                />

                <div className="btn-container">
                    <button type="button" className="cancel" >Cancel</button>
                    <button type="button" className="submit" onClick={handleEditSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};