import weatherSlice from "@/features/weather/WeatherSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        weather: weatherSlice
    },
})