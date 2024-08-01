import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: undefined,
  isLoaded: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
  },
});

export const { setData } = weatherSlice.actions;

export default weatherSlice.reducer;
