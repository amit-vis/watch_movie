const Movie = require("../model/movie");

module.exports.create = async (req,res)=>{
    try {
        const {title, description,releaseyear, genre} = req.body;
        if(title === "" || description === ""|| releaseyear === null || genre === ""){
            return res.status(400).json({
                message: "kindly enter the required details!",
                success: false
            })
        }
        const newMovie = await Movie.create(req.body);
        return res.status(200).json({
            message: "movie has been created successfully!!",
            success: true,
            movie: newMovie
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in creating the movie!!",
            error: error.message
        })
    }
}

module.exports.getMovie = async (req, res)=>{
    try {
        const movies = await Movie.find({}).sort({createdAt: -1}).populate("reviews");
        if(!movies){
            return res.status(400).json({
                message: "movie not found or not available!!"
            })
        }
        return res.status(200).json({
            message: "Here is your data",
            movie: movies
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the movie!!",
            error: error.message
        })
    }
}

module.exports.toggleWatch = async (req, res)=>{
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(400).json({
                message: "Movie not found!!"
            })
        }
        movie.watch = !movie.watch
        await movie.save();
        return res.status(200).json({
            message: "successfull toggle!",
            movie
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.editDetails = async (req, res) => {
    try {
        const editData = await Movie.findById(req.params.id);

        if (!editData) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        // Update movie details based on request body
        editData.title = req.body.title;
        editData.description = req.body.description;
        editData.genre = req.body.genre;
        editData.releaseyear = req.body.releaseyear;

        // Save updated movie data
        await editData.save();

        return res.status(200).json({
            message: "Movie details updated successfully",
            movie: editData
        });
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({ message: error.message });
    }
};

module.exports.delete = async (req, res)=>{
    try {
        const moviedelete = await Movie.findByIdAndDelete(req.params.id);
        if(!moviedelete){
            return res.status(400).json({
                message: "Movie is not available or does not exist!"
            })
        }
        return res.status(200).json({
            message: "movie deleted successfully!",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getDataById = async (req, res)=>{
    try {
        const findMovie = await Movie.findById(req.params.id).populate("reviews");
        if(!findMovie){
            return res.status(400).json({
                message: "Movie is not available or does not exist!"
            })
        }
        return res.status(200).json({
            message: "check data!",
            movie: findMovie
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}