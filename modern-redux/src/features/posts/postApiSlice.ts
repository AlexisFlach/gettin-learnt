import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Posts {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const apiSlice = createApi({
  reducerPath: '/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query<Posts[],  number | void>({
         query(limit=10) {
           return `/posts?_start=0&_limit=${limit}`
         } })
    }
  }
})

export const { useFetchPostsQuery } = apiSlice;