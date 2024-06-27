import "./Details.css";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleData, selectedMovieSelector, toggleWatchStatus } from "../../redux/reducer/moviereducer";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../NavSection/Navbar";

export const ShowDetails = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const selectedMovie = useSelector(selectedMovieSelector);

    useEffect(() => {
        if (movieId) {
            dispatch(getSingleData(movieId));
        }
    }, [dispatch, movieId]);

    const handleWatch = async (movieId) => {
        const resultAction = await dispatch(toggleWatchStatus(movieId));
        if (toggleWatchStatus.fulfilled.match(resultAction)) {
            const { watch } = resultAction.payload;
            toast.success(watch ? "Marked as watched" : "Marked as unwatched");
            dispatch(getSingleData(movieId)); // Re-fetch the single movie data
        } else {
            toast.error("Error occurred in toggling");
        }
    };

    return (
        <>
        <Navbar/>
            <h1 className="details-heading">Check Details</h1>
            {selectedMovie ? (
                <table className="table-details">
                    <thead>
                        <tr>
                            <th>Details</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>{selectedMovie.title}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{selectedMovie.description}</td>
                        </tr>
                        <tr>
                            <td>Release Year</td>
                            <td>{selectedMovie.releaseyear}</td>
                        </tr>
                        <tr>
                            <td>Genre</td>
                            <td>{selectedMovie.genre}</td>
                        </tr>
                        <tr>
                            <td>Watch Status</td>
                            <td onClick={() => handleWatch(selectedMovie._id)}>{selectedMovie.watch ? "Watch" : "Unwatch"}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <a href={`/create-review/${selectedMovie._id}`}>Add review</a>
                            </td>
                        </tr>
                        {selectedMovie.reviews.length > 0 ? (
                            selectedMovie.reviews.map((review, index) => (
                                <Fragment key={index}>
                                    <tr>
                                        <td>Rating</td>
                                        <td>
                                            {Array.from({ length: 5 }, (col, index) => (
                                                <FaStar key={index}
                                                    color={index + 1 <= review.rating ? "#ffc107" : "#e4e5e9"} size={20} className="star"
                                                />
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Review</td>
                                        <td>{review.review}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <a href={`/edit-review/${review._id}`}>Edit Review</a>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No reviews</td>
                            </tr>
                        )}
                    </tbody>
                    <ToastContainer />
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
