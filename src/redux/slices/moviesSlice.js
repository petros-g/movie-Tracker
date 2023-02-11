import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  fetchGenres,
  fetchPopular,
  fetchSearchResults,
} from "../../api/apiFunctions";

const initialState = {
  moviesCurrent: null,
  moviesPopular: null,
  moviesUpcoming: null,
  moviesTopRated: null,
  genres: undefined,
  searchResults: null,
};

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  (category, {getState}) => {
    const {moviesSlice} = getState();

    if (moviesSlice.moviesPopular) {
      return moviesSlice.moviesPopular;
    }

    return fetchPopular(true, category);
  },
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/getUpcomingMovies",
  (category, {getState}) => {
    const {moviesSlice} = getState();
    if (moviesSlice.moviesUpcoming) {
      return moviesSlice.moviesUpcoming;
    }

    return fetchPopular(true, category);
  },
);

export const getTopRatedMovies = createAsyncThunk(
  "movies/getTopRatedMovies",
  (category, {getState}) => {
    const {moviesSlice} = getState();

    if (moviesSlice.moviesTopRated) {
      return moviesSlice.moviesTopRated;
    }

    return fetchPopular(true, category);
  },
);

export const getGenres = createAsyncThunk(
  "movies/getGenres",
  (par, {getState}) => {
    const {moviesSlice} = getState();
    if (moviesSlice.genres) {
      return moviesSlice.genres;
    }

    return fetchGenres();
  },
);

export const getSearchResults = createAsyncThunk(
  "movies/getSearchResults",
  object => {
    if (!object) return;
    return fetchSearchResults(object);
  },
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesPopular: (state, action) => {
      return {...state, moviesPopular: action.payload};
    },
    setSearchResults: (state, action) => {
      return {...state, searchResults: null};
    },
  },
  extraReducers: builder => {
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      state.moviesPopular = action.payload;
      state.moviesCurrent = action.payload;
    });
    builder.addCase(getUpcomingMovies.fulfilled, (state, action) => {
      state.moviesUpcoming = action.payload;
      state.moviesCurrent = action.payload;
    });
    builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
      state.moviesTopRated = action.payload;
      state.moviesCurrent = action.payload;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export const {setMoviesPopular, setSearchResults} = moviesSlice.actions;

export default moviesSlice.reducer;
