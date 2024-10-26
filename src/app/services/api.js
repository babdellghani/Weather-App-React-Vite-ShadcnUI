import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.weatherapi.com/",
    }),
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: false,
    endpoints: (builder) => ({
        getWeatherSearch: builder.query({
            query: (search) => `v1/search.json?key=${import.meta.env.VITE_APP_API_KEY}&q=${search}`,
            keepUnusedDataFor: 60 * 60 * 24,
        }),
        getWeatherLocation: builder.query({
            query: ({ lat, lon }) => `v1/forecast.json?key=${import.meta.env.VITE_APP_API_KEY}&q=${lat},${lon}&days=10`,
            keepUnusedDataFor: 60 * 60,
        }),
    }),
});

export const { useGetWeatherSearchQuery, useGetWeatherLocationQuery } = api;