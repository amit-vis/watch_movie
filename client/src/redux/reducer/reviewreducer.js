import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createReview = createAsyncThunk(
    "review/create",
    async ({ movieId, review }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/review/create/${movieId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rating: review.rating,
                    review: review.review,
                    movie: movieId
                })
            });
            if (response.ok) {
                const data = await response.json();
                return data.review;
            } else {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editReview = createAsyncThunk("review/edit", async ({ reviewId, review }, { rejectWithValue }) => {
    try {
        const response = await fetch(`/review/update/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        });
        if (response.ok) {
            const data = await response.json();
            return data.review
        } else {
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getreviewData = createAsyncThunk("review/get", async (reviewId, { rejectWithValue }) => {
    try {
        const response = await fetch(`/review/view/${reviewId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json();
            return data.review
        } else {
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialState = {
    status: "idle",
    reviews: [],
    error: null,
    editreview: []
};

const reviewSlice = createSlice({
    name: "Review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.status = "Loading";
                console.log(state.status);
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.reviews.push(action.payload);
                console.log(state.status);
            })
            .addCase(createReview.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })
            .addCase(editReview.pending, (state) => {
                state.status = "pending"
            })
            .addCase(editReview.fulfilled, (state, action) => {
                state.status = "Succeeded"
                const index = state.editreview.findIndex(revi => revi._id === action.payload._id)
                if (index !== -1) {
                    state.editreview[index] = action.payload
                }
            })
            .addCase(editReview.rejected, (state, action) => {
                state.status = "Failed"
                state.error = action.payload
            })
            .addCase(getreviewData.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getreviewData.fulfilled, (state, action) => {
                state.status = "Succeeded"
                state.reviews = action.payload
            })
            .addCase(getreviewData.rejected, (state, action) => {
                state.status = "Failed"
                state.error = action.payload
            })
    }
});

export const reviewReducer = reviewSlice.reducer;
export const reviewSelector = (state) => state.reviews.reviews;
export const editReviewSelector = (state) => state.reviews.editReview;