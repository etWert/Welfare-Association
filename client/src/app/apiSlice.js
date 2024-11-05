import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setToken } from "../features/auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:1111",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
        headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result);

    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {
            api.dispatch(setToken({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired"
            }
            return refreshResult
        }
    }
    return result
}


const apiSlice = createApi({
    reducerPath: "api",
    baseQuery:baseQueryWithReauth,
    endpoints: (builder) => ({})
})
export default apiSlice