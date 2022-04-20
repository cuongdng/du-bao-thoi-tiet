import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apis from '../../apis';

export const getWeatherData = createAsyncThunk('weather/getWeatherData', async (params, thunkAPI) => {
    const res = await apis.getWeatherData(params.lon, params.lat);
    return res.data;
});

export const setLocationActive = createAsyncThunk('location/setLocationActive', async (params) => {
    const res = await apis.getLocationNameByCoordinates(params.lon, params.lat);
    return res.data[0].local_names.vi;
});

const initState = {
    weatherData: {},
    locationActive: '',
    loading: true,
    error: '',
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initState,
    reducers: {
        addWeatherData: (state, action) => {
            state.weatherData = action.payload;
        },
    },
    extraReducers: {
        [getWeatherData.pending]: (state) => {
            state.loading = true;
        },
        [getWeatherData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getWeatherData.fulfilled]: (state, action) => {
            state.weatherData = action.payload;
            state.loading = false;
        },

        [setLocationActive.pending]: (state) => {
            state.loading = true;
        },
        [setLocationActive.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [setLocationActive.fulfilled]: (state, action) => {
            state.locationActive = action.payload;
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
