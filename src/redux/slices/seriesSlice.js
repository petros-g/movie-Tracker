import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchPopular} from "../../api/apiFunctions";

const initialState = {
  seriesCurrent: null,
  seriesPopular: null,
  seriesUpcoming: null,
  seriesTopRated: null,
};

export const getPopularSeries = createAsyncThunk(
  "series/getPopularSeries",
  (category, {getState}) => {
    const {seriesSlice} = getState();
    if (seriesSlice.seriesPopular) {
      return seriesSlice.seriesPopular;
    }

    return fetchPopular(false, category);
  },
);

export const getUpcomingSeries = createAsyncThunk(
  "series/getUpcomingMovies",
  (category, {getState}) => {
    const {seriesSlice} = getState();
    if (seriesSlice.seriesUpcoming) {
      return seriesSlice.seriesUpcoming;
    }

    return fetchPopular(false, category);
  },
);

export const getTopRatedSeries = createAsyncThunk(
  "series/getTopRatedMovies",
  (category, {getState}) => {
    const {seriesSlice} = getState();

    if (seriesSlice.seriesTopRated) {
      return seriesSlice.seriesTopRated;
    }

    return fetchPopular(false, category);
  },
);

export const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setseriesPopular: (state, action) => {
      return {...state, seriesPopular: action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(getPopularSeries.fulfilled, (state, action) => {
      state.seriesPopular = action.payload;
      state.seriesCurrent = action.payload;
    });
    builder.addCase(getUpcomingSeries.fulfilled, (state, action) => {
      state.seriesUpcoming = action.payload;
      state.seriesCurrent = action.payload;
    });
    builder.addCase(getTopRatedSeries.fulfilled, (state, action) => {
      state.seriesTopRated = action.payload;
      state.seriesCurrent = action.payload;
    });
  },
});

export const {setseriesPopular} = seriesSlice.actions;

export default seriesSlice.reducer;
