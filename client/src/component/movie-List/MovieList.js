

import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getMovieDetails, movieSelector, toggleWatchStatus } from "../../redux/reducer/moviereducer";
import { Navbar } from "../NavSection/Navbar";
import "./MovieList.css";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { PiEyeClosedFill } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(movieSelector);
    useEffect(() => {
        dispatch(getMovieDetails())
    }, [dispatch])

    console.log("here is the movies from", movies)

    const handleWatch = async (movieId)=>{
       const resultAction = await dispatch(toggleWatchStatus(movieId));
       if(toggleWatchStatus.fulfilled.match(resultAction)){
        const {watch } = resultAction.payload;
        toast.success(watch? "Marked as watched": "Marked as unwatched");
        dispatch(getMovieDetails())
       }else{
        toast.error("error in occured in toggling")
       }
    }

    const handleDelete = async (movieId)=>{
        const resultAction = await dispatch(deleteItem(movieId));
        if(deleteItem.fulfilled.match(resultAction)){
            toast.success("movie deleted successfully")
            dispatch(getMovieDetails())
        }else{
            toast.error("Error an occured in deleting the item")
        }
    }
    return (
        <>
            <Navbar />
            <div className="movie-container">
                <h1 className="movie-heading">Movie Watch List</h1>
                <ul className="list-container">
                    {movies?.map((data, index) => (
                        <li key={index}>
                            <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
                                width="100%" height="50%" />
                            <span>{data.title}</span>
                            <div className="button-container top-button-cont">
                                <Link type="button" className="button" to={`/edit/${data._id}`}>Edit</Link>
                                <button className="button" onClick={()=>handleDelete(data._id)}>Delete</button>
                            </div>
                            <div className="button-container bottom-button-cont">
                                {data.watch? (<FaEye className="eye-icon" onClick={()=>handleWatch(data._id)}/>): (<PiEyeClosedFill className="eye-icon" onClick={()=>handleWatch(data._id)}/>)}
                                <button className="button">
                                    <Link to={`/details/${data._id}`}>
                                    check Details
                                    </Link></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <ToastContainer/>
            </div>
        </>
    )
}
