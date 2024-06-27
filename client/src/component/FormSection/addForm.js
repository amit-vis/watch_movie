import { useState } from "react";
import { Navbar } from "../NavSection/Navbar";
import "./Form.css";
import {ToastContainer, toast} from "react-toastify"
import { useDispatch } from "react-redux";
import { addMovie } from "../../redux/reducer/moviereducer";
import {useNavigate} from "react-router-dom"

export const AddForm = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [movieData, setMovieData] = useState({title:"", description:"", releaseyear:"", genre:""});
    const handleCancel = ()=>{
        setMovieData({
            title:"",
            description:"",
            releaseyear:"",
            genre:""
        })
    }
    const handleSubmit = async ()=>{
        try {
            if(movieData.title===""||movieData.description===""||movieData.releaseyear===""||movieData.genre===""){
                toast.warn("The input section must not be empty!");
                return
            }
            const resultAction = await dispatch(addMovie(movieData));
            if(addMovie.rejected.match(resultAction)){
                const errorMessage = resultAction.payload || "Registration Failed!";
                if(errorMessage){
                    toast.warn(errorMessage.message)
                }
            }else{
                toast.success("Movie Added Successfully!");
                setMovieData({title: "", description:"", releaseyear:"", genre:""});
                await navigate("/")
            }

        } catch (error) {
            toast.error("error occurred during the registartion!!");
            console.log(error.message)
            return
        }
    }
    return(
        <>
        <Navbar/>
        <div className="main-container">
                <div className="form-container">
                    <label htmlFor="title">Title:</label>
                    <input type="text" 
                    id="title" 
                    name="title" 
                    value={movieData.title}
                    onChange={(e)=>setMovieData({...movieData, title: e.target.value})}
                    placeholder="Enter title..." 
                    />
                    <label htmlFor="description">Description:</label>
                    <input 
                    type="text" 
                    id="description" 
                    name="description" 
                    placeholder="Enter description..."
                    value={movieData.description}
                    onChange={(e)=>setMovieData({...movieData, description:e.target.value})} 
                    />
                    <label htmlFor="release-year">Release Year:</label>
                    <input type="number" 
                    id="release-year" 
                    name="releaseYear" 
                    value={movieData.releaseyear}
                    onChange={(e)=>setMovieData({...movieData, releaseyear:e.target.value})}
                    placeholder="Enter release year..." />
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" 
                    id="genre" name="genre" 
                    placeholder="Enter genre..."
                    value={movieData.genre}
                    onChange={(e)=>setMovieData({...movieData, genre: e.target.value})} 
                    />
                    <div className="btn-container">
                        <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                        <button type="button" className="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}