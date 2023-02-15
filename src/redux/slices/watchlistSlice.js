import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  watchlist: [],
  ids: [],
};

export const watchlistSlice = createSlice({
  name: "watchlistSlice",
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    },
    deleteItemInList: (state, action) => {
      return {
        ...state,
        ids: state.ids.filter(item => item !== action.payload),
      };
    },
  },
});

export const {setWatchlist, deleteItemInList} = watchlistSlice.actions;

export default watchlistSlice.reducer;
