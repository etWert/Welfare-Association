import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authReducer from "../features/auth/authSlice"
const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer
    },
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(apiSlice.middleware),
    devTools:false
})
export default store