import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./slices";
import moviesSlice from "./slices/moviesSlice";
import seriesSlice from "./slices/seriesSlice";
import detailsSlice from "./slices/detailsSlice";

export default configureStore({
  reducer: {
    moviesSlice,
    seriesSlice,
    detailsSlice,
  },
});
