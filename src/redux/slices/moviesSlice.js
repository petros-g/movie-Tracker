import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchGenres, fetchPopular} from "../../api/apiFunctions";

const initialState = {
  moviesPopular: {},
  genres: {},
};

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  () => {
    return fetchPopular(true);
  },
);

export const getGenres = createAsyncThunk("movies/getGenres", () => {
  return fetchGenres();
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesPopular: (state, action) => {
      return {...state, moviesPopular: action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      state.moviesPopular = action.payload;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});

export const {setMoviesPopular} = moviesSlice.actions;

export default moviesSlice.reducer;
