import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { autoGenerateHeats } from '../utils/autoGenerateHeats';

const user = JSON.parse(localStorage.getItem('user'));
const uid = user ? user.uid : '';
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_DEV}${user.role}`;

const initialState = {
  heats: [],
  heat: null,
  status: 'idle',
  error: null,
};

export const fetchHeats = createAsyncThunk('heats/fetchHeats', async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/heats`, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch heats');
  }
});

export const addHeats = createAsyncThunk('heats/addHeats', async () => {
  try {
    const entries = await axios.get(`${BACKEND_URL}/entries`);
    const currentHeats = await axios.get(`${BACKEND_URL}/heats`);
    const schedules = await axios.get(`${BACKEND_URL}/schedules`);
    const heats = await autoGenerateHeats(schedules.data, entries, currentHeats);
    const response = await axios.post(`${BACKEND_URL}/heats`, heats, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to add heat');
  }
});

export const addOneHeat = createAsyncThunk('heats/addOneHeat', async (heatData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/heats`, heatData, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to add heat');
  }
});

export const getOneHeat = createAsyncThunk('heats/getOneHeat', async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/heats/${id}`, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch heat');
  }
});

export const deleteHeat = createAsyncThunk('heats/deleteHeat', async (id) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/heats/${id}`, {
      headers: {
        tenant: uid,
      },
    });
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
      .addCase(addHeats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHeats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heats = action.payload;
      })
      .addCase(addHeats.rejected, (state, action) => {
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
      })
      .addCase(getOneHeat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOneHeat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heat = action.payload;
      })
      .addCase(getOneHeat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default heatsSlice.reducer;
