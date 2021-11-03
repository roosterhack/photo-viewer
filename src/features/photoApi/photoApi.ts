import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLUSH_ACCESS_KEY;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.unsplash.com/",
  }),
  tagTypes: ["Photo"],
  endpoints: (builder) => ({
    fetchRandomPhoto: builder.query({
      query() {
        return `/photos/random?client_id=${UNSPLASH_KEY}`;
      },
      providesTags: ["Photo"],
    }),
  }),
});

export const { useFetchRandomPhotoQuery } = apiSlice;
