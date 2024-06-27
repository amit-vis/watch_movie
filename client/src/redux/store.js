import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./reducer/moviereducer";
import { reviewReducer } from "./reducer/reviewreducer";

export const store = configureStore({
    reducer:{
        movie: movieReducer,
        reviews: reviewReducer
    }
})