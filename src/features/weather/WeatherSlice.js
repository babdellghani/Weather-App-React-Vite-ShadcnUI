import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: undefined,
  isLoaded: false,
  typeTemp: "F",
  typeWind: "Kph",
  typePressure: "Mb",
  typeVisibility: "Km",
  typePrecip: "Mm",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    setTypeTemp: (state, action) => {
      state.typeTemp = action.payload;
    },
    setTypeWind: (state, action) => {
      state.typeWind = action.payload;
    },
    setTypePressure: (state, action) => {
      state.typePressure = action.payload;
    },
    setTypeVisibility: (state, action) => {
      state.typeVisibility = action.payload;
    },
    setTypePrecip: (state, action) => {
      state.typePrecip = action.payload;
    },
  },
});

export const {
  setData,
  setTypeTemp,
  setTypeWind,
  setTypePressure,
  setTypeVisibility,
  setTypePrecip,
} = weatherSlice.actions;

export default weatherSlice.reducer;
