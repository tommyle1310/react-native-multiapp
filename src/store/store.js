import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterReducer";
import authReducer from "./features/authSlice";
import activityReducer from "./features/TimeTracker/activitySlice"
import calculatorReducer from "./features/Calculator/calculatorSlice"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        activity: activityReducer,
        calc: calculatorReducer
    }
})
