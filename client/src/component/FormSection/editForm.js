import { useDispatch, useSelector } from "react-redux";
import { getSingleData, selectedMovieSelector, updateDetails } from "../../redux/reducer/moviereducer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EditForm = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = useSelector(selectedMovieSelector);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseyear: '',
    genre: ''
  });

  useEffect(() => {
    if (movieId) {
      dispatch(getSingleData(movieId));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        releaseyear: movie.releaseyear,
        genre: movie.genre
      });
    }
  }, [movie]);


  const handleCancel = ()=>{
    setFormData({
      title:"",
      description:"",
      releaseyear:"",
      genre:""
    })
  }

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(updateDetails({
        id: movieId,
        movie: formData
      }));
  
      if (resultAction.type === updateDetails.fulfilled.type) {
        toast.success("Details updated successfully");
        setFormData({
          title:"",
          description:"",
          releaseyear:"",
          genre:""
        });
        navigate("/");
        dispatch(getSingleData(movieId))
      } else {
        toast.error("Failed to update movie");
      }
    } catch (error) {
      console.log("An unexpected error occurred", error.message);
      toast.error("Failed to update movie");
    }
  };  

  return (
    <>
      <div className="main-container">
        <div className="form-container">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title..."
            value={formData.title}
            onChange={(e)=>setFormData({...formData, title: e.target.value})}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter description..."
            value={formData.description}
            onChange={(e)=>setFormData({...formData, description: e.target.value})}
          />

          <label htmlFor="releaseYear">Release Year:</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            placeholder="Enter release year..."
            value={formData.releaseyear}
            onChange={(e)=>setFormData({...formData, releaseyear: e.target.value})}
          />

          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Enter genre..."
            value={formData.genre}
            onChange={(e)=>setFormData({...formData, genre:e.target.value})}
          />

          <div className="btn-container">
            <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
            <button type="button" className="submit" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};
