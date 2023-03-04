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
        watchlist: [...state.watchlist, action.payload],
      };
    },
    deleteItemInList: (state, action) => {
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.id !== action.payload),
      };
    },
  },
});

export const {setWatchlist, deleteItemInList} = watchlistSlice.actions;

export default watchlistSlice.reducer;
