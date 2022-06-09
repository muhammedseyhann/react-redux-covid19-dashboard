import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get Accumulated World Data (Total Cases,Deaths etc..)
export const getTotalCounts = createAsyncThunk(
    "covidData/getTotalCounts",
    async () => {
        const { data } = await axios.get("https://disease.sh/v3/covid-19/all");
        return data;
    }
);

//Get World Total Data
export const getWorldData = createAsyncThunk(
    "covidData/getWorldData",
    async () => {
        const { data } = await axios.get(
            "https://disease.sh/v3/covid-19/countries?sort=cases"
        );
        return data;
    }
);
// Get History of Specific Country Data
export const getHistoryOfCountryData = createAsyncThunk(
    "covidData/getHistoryOfCountryData",
    async (id) => {
        const { data } = await axios.get(
            `https://disease.sh/v3/covid-19/historical/${id}?lastdays=30`
        );
        return data;
    }
);

const covidDataSlice = createSlice({
    name: "covidData",
    initialState: {
        totalCounts: {
            data: [],
            isLoading: false,
        },
        worldData: {
            data: [],
            isLoading: false,
        },
        historyData: {
            data: null,
            isLoading: false,
        },
    },
    reducers: {},
    extraReducers: {
        //Set Accumulated World Data (Total Cases,Deaths etc..)
        [getTotalCounts.pending]: (state) => {
            state.totalCounts.isLoading = true;
        },
        [getTotalCounts.fulfilled]: (state, action) => {
            state.totalCounts.data = action.payload;
            state.totalCounts.isLoading = false;
        },
        //Set World Total Data
        [getWorldData.pending]: (state) => {
            state.worldData.isLoading = true;
        },
        [getWorldData.fulfilled]: (state, action) => {
            state.worldData.data = action.payload;
            state.worldData.isLoading = false;
        },
        //Set Specific Country Data
        [getHistoryOfCountryData.pending]: (state) => {
            state.historyData.isLoading = true;
        },
        [getHistoryOfCountryData.fulfilled]: (state, action) => {
            state.historyData.data = action.payload;
            state.historyData.isLoading = false;
        },
    },
});

export const selectTotalCounts = (state) => state.covidData.totalCounts;
export const selectWorldData = (state) => state.covidData.worldData;
export const selectCountryHistoryData = (state) => state.covidData.historyData;

export default covidDataSlice.reducer;
