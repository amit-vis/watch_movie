import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const addMovie = createAsyncThunk("add/movie", async (movie, {rejectWithValue})=>{
    try {
        const {title, description, releaseyear, genre} = movie;
        const response = await fetch("/movie/add", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title:title,
                description: description,
                releaseyear: releaseyear,
                genre: genre
            })
        });
        if(response.ok){
            const data = await response.json();
            return data
        }else{
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getMovieDetails = createAsyncThunk("/movie/get", async (_,{rejectWithValue})=>{
    try {
        const response = await fetch("movie/view", {
            method: "GET",
            headers:{
               "Content-Type": "application/json" 
            },
        });
        if(response.ok){
            const data = await response.json();
            return data.movie
        }else{
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const toggleWatchStatus = createAsyncThunk("movie/toggle", async (movieId, {rejectWithValue})=>{
    try {
        const response = await fetch(`/movie/watch-toggle/${movieId}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            const data = await response.json();
            return data.movie
        }else{
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const updateDetails = createAsyncThunk("movie/update", async ({id, movie}, {rejectWithValue})=>{
    try {
        const response = await fetch(`/movie/update/${id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        });
        if(response.ok){
            const data = await response.json();
            return data.movie
        }else{
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getSingleData = createAsyncThunk("movie/getsingle", async (movieId, {rejectWithValue})=>{
    try {
        const response = await fetch(`/movie/view-id/${movieId}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            const data = await response.json();
            return data.movie
        }else{
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteItem = createAsyncThunk("movie/delete", async (movieId, {rejectWithValue})=>{
    try {
        const response = await fetch(`/movie/delete/${movieId}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        if(response.ok){
            const data = await response.json();
            return data
        }else{
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialstate = {
    status: "idle",
    moviedata: [],
    error: null,
    selectedMovies:null,
    updateDetails: []
}
const movieSlice = createSlice({
    name: "movie",
    initialState: initialstate,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(addMovie.pending, (state)=>{
            state.status = "Loading.."
            console.log(state.status)
        })
        .addCase(addMovie.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.moviedata.push(action.payload)
        })
        .addCase(addMovie.rejected, (state, action)=>{
            state.status = "Failed";
            state.error = action.payload || "Failed to add movie"

        })
        .addCase(getMovieDetails.pending, (state)=>{
            state.status = "Loading.."
        })
        .addCase(getMovieDetails.fulfilled, (state, action)=>{
            state.status = "Succeeded";
            state.moviedata = action.payload
        })
        .addCase(getMovieDetails.rejected, (state,action)=>{
            state.status = "Failed";
            state.error = action.payload
        })
        .addCase(toggleWatchStatus.pending, (state)=>{
            state.status = "Loading"
        })
        .addCase(toggleWatchStatus.fulfilled, (state,action)=>{
            state.status = "Succeeded"
            const index = state.moviedata.findIndex(movie=>movie._id === action.payload._id)
            if(index !== -1){
                state.moviedata[index] = action.payload;
            }
            console.log(action.payload)
        })
        .addCase(toggleWatchStatus.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(updateDetails.pending, (state)=>{
            state.status = "Loading"
            console.log(state.status)
        })
        .addCase(updateDetails.fulfilled, (state, action)=>{
            state.status = "Succeeded"
            const index = state.updateDetails.findIndex(movie=> movie._id === action.payload._id)
            if(index !== -1){
                state.updateDetails[index] = action.payload
            }
        })
        .addCase(updateDetails.rejected, (state, action)=>{
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(getSingleData.pending, (state) => {
            state.status = "Loading.."
        })
        .addCase(getSingleData.fulfilled, (state, action) => {
            state.status = "Succeeded"
            state.selectedMovies = action.payload
        })
        .addCase(getSingleData.rejected, (state, action) => {
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(deleteItem.pending, (state)=>{
            state.status = "Loading"
        })
        .addCase(deleteItem.fulfilled, (state,action)=>{
            state.status = "Succeeded"
            state.moviedata = state.moviedata.filter(item=> item._id !== action.payload._id);
        })
    }
    
});

export const movieReducer = movieSlice.reducer;
export const movieSelector = (state)=>state.movie.moviedata;
export const selectedMovieSelector = (state)=>state.movie.selectedMovies;
export const updateMovieSelector = (state)=>state.movie.updateDetails;
