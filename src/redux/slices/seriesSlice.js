import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchPopular} from "../../api/apiFunctions";

const initialState = {
  seriesPopular: {},
};

export const getPopularSeries = createAsyncThunk(
  "series/getPopularSeries",
  () => {
    return fetchPopular();
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
    });
  },
});

export const {setseriesPopular} = seriesSlice.actions;

export default seriesSlice.reducer;
