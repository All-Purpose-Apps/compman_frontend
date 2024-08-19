import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dances: [],
  danceCategories: [],
  status: 'idle',
  error: null,
};

export const fetchDances = createAsyncThunk('dances/fetchDances', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/dances`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetchDanceCategories = createAsyncThunk('dances/fetchDanceCategories', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/danceCategory`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const turnOnOffDanceCategory = createAsyncThunk('dances/turnOnOffDanceCategory', async (danceCategory) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_DEV}/danceCategory/${danceCategory._id}`, danceCategory);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const dancesSlice = createSlice({
  name: 'dances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDances.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dances = action.payload
          .map((dance) => {
            return dance.danceCategory.turnedOn ? dance : null;
          })
          .filter((dance) => dance !== null);
      })
      .addCase(fetchDances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDanceCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDanceCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.danceCategories = action.payload;
      })
      .addCase(fetchDanceCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(turnOnOffDanceCategory.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(turnOnOffDanceCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.danceCategories = action.payload;
      })
      .addCase(turnOnOffDanceCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dancesSlice.reducer;
