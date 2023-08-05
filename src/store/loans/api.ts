import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_LOCAL_URL } from '../../config'
// import { useDispatch, useSelector } from "react-redux";

// const token = useSelector((state) => state.auth.token);
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

    // getDashboardStatistics: builder.query<ChurchDashboardStatisticsResponse, void>({
    //     query: () => ({
    //         url: `church/dashboard`,
    //         method: 'GET',
    //     }),
    // }),

    // fetchPrivilegedActivities: builder.query({
    //   query: () => ({
    //     url: "Activity/Priviledged",
    //     method: "GET",
    //   }),
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllLoanRequestMutation } = loanApi
