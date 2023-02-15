import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchDetails, fetchGenres} from "../../api/apiFunctions";

const initialState = {
  detailsData: null,
  isDetailModalVisible: false,
};

export const getDetailsData = createAsyncThunk("getDetailsData", object => {
  // const {detailsSlice} = getState();
  // if (object.id === detailsSlice?.detailsData?.id) {
  //   return detailsSlice?.detailsData;
  // }
  return fetchDetails(object);
});

export const detailsSlice = createSlice({
  name: "detailSlice",
  initialState,
  reducers: {
    setDetailsData: (state, action) => {
      return {...state, detailsData: action.payload};
    },
    setDetailModalVisible: (state, action) => {
      return {...state, isDetailModalVisible: action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(getDetailsData.fulfilled, (state, action) => {
      state.detailsData = action.payload;
    });
  },
});

export const {setDetailsData, setDetailModalVisible} = detailsSlice.actions;

export default detailsSlice.reducer;
