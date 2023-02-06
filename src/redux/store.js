import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./slices";
import moviesSlice from "./slices/moviesSlice";
import seriesSlice from "./slices/seriesSlice";
import detailsSlice from "./slices/detailsSlice";
import videoSlice from "./slices/videoSlice";

export default configureStore({
  reducer: {
    moviesSlice,
    seriesSlice,
    detailsSlice,
    videoSlice,
  },
});
