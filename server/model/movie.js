const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    releaseyear:{
        type:Number,
        required: true
    },
    genre:{
        type:String,
        required:true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    watch:{
        type: Boolean,
        required: true,
        default: false
    }

},{
    timestamps: true
});

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;