import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_LOCAL_URL } from '../../config'

// Define a service using a base URL and expected endpoints
export const loanApi = createApi({
  reducerPath: 'loanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllLoanRequest: builder.mutation({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllLoanRequestMutation } = loanApi
