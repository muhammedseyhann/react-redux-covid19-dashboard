import { configureStore } from "@reduxjs/toolkit";
import covidDataSlice from "./covidDataSlice";
export const store = configureStore({
    reducer: {
        covidData: covidDataSlice,
    },
});
