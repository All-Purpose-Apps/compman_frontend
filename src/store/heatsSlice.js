import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  heats: [], // Store fetched heats
  heat: null, // Store a single heat (if needed)
  status: 'idle',
  error: null,
};

export const fetchHeats = createAsyncThunk('heats/fetchHeats', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api_v1/heats');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch heats');
  }
});

export const addHeat = createAsyncThunk('heats/addHeat', async (heatData) => {
  try {
    const response = await axios.post('http://localhost:3000/api_v1/heats', heatData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to add heat');
  }
});

export const deleteHeat = createAsyncThunk('heats/deleteHeat', async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api_v1/heats/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to add heat');
  }
});

// Add other async thunks for fetching a single heat, editing, deleting, etc. if needed

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
    // Add cases for other async thunks here
  },
});

export default heatsSlice.reducer;
