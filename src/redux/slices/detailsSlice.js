import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchDetails, fetchGenres} from "../../api/apiFunctions";

const initialState = {
  detailsData: {},
  isModalVisible: false,
};

export const getDetailsData = createAsyncThunk(
  "getDetailsData",
  (object, {getState}) => {
    const {detailsSlice} = getState();
    if (object.id === detailsSlice?.detailsData?.id) {
      return detailsSlice?.detailsData;
    }
    return fetchDetails(object);
  },
);

export const detailsSlice = createSlice({
  name: "detailSlice",
  initialState,
  reducers: {
    setDetailsData: (state, action) => {
      return {...state, detailsData: action.payload};
    },
    setModalVisible: (state, action) => {
      return {...state, isModalVisible: action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(getDetailsData.fulfilled, (state, action) => {
      state.detailsData = action.payload;
      state.isModalVisible = true;
    });
  },
});

export const {setDetailsData, setModalVisible} = detailsSlice.actions;

export default detailsSlice.reducer;
