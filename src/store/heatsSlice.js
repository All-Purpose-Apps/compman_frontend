import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { autoGenerateHeats } from '../utils/autoGenerateHeats';

const initialState = {
  heats: [],
  heat: null,
  status: 'idle',
  error: null,
};

export const fetchHeats = createAsyncThunk('heats/fetchHeats', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/heats`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch heats');
  }
});

export const addHeat = createAsyncThunk('heats/addHeat', async (heatData) => {
  try {
    const entries = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/entries`);
    const currentHeats = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/heats`);
    const heats = await autoGenerateHeats(heatData, entries, currentHeats);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DEV}/heats`, heats);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to add heat');
  }
});

export const deleteHeat = createAsyncThunk('heats/deleteHeat', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_DEV}/heats/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to add heat');
  }
});

export const heatsSlice = createSlice({
  name: 'heats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heats = action.payload;
      })
      .addCase(fetchHeats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addHeat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHeat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heats = action.payload;
      })
      .addCase(addHeat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteHeat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteHeat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heats = action.payload;
      })
      .addCase(deleteHeat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default heatsSlice.reducer;
