import {configureStore} from "@reduxjs/toolkit";
import detailsSlice from "./slices/detailsSlice";
import moviesSlice from "./slices/moviesSlice";
import seriesSlice from "./slices/seriesSlice";
import videoSlice from "./slices/videoSlice";
import watchlistSlice from "./slices/watchlistSlice";

export default configureStore({
  reducer: {
    moviesSlice,
    seriesSlice,
    detailsSlice,
    videoSlice,
    watchlistSlice,
  },
});
