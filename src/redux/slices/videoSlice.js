import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchVideo} from "../../api/apiFunctions";

const initialState = {
  videoData: null,
  isVideoModalVisible: false,
};

export const getVideoData = createAsyncThunk("videoSlice/getVideoData", id => {
  return fetchVideo(id);
});

export const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    setIsVideoModalVisible: (state, action) => {
      return {...state, isVideoModalVisible: action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(getVideoData.fulfilled, (state, action) => {
      console.log(action);
      state.videoData = action.payload;
    });
  },
});

export const {setIsVideoModalVisible} = videoSlice.actions;

export default videoSlice.reducer;
