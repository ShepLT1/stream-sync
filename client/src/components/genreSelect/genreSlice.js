import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        1: "Drama",
        2: "Comedy",
        3: "Thriller"
    }
}

const genreSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        selectGenre1: (state, action) => {
            state.value[1] = action.payload
        },
        selectGenre2: (state, action) => {
            state.value[2] = action.payload
        },
        selectGenre3: (state, action) => {
            state.value[3] = action.payload
        }
    }
});

export const getGenre1 = (state) => state.genres.value[1];
export const getGenre2 = (state) => state.genres.value[2];
export const getGenre3 = (state) => state.genres.value[3];

export const { selectGenre1, selectGenre2, selectGenre3 } = genreSlice.actions;
export default genreSlice.reducer;