import { configureStore } from "@reduxjs/toolkit";
import internshipReducer from "./internshipslice";

export const store = configureStore({
    reducer:internshipReducer
})