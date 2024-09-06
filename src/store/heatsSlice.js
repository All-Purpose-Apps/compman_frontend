import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { autoGenerateHeats } from '../utils/autoGenerateHeats';
import getUrl from './getUrl';

const initialState = {
  heats: [],
  heat: null,
  status: 'idle',
  error: null,
};

// Utility function to get headers and URL
const getAuthHeaders = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { BACKEND_URL, uid } = await getUrl(user);
  return {
    BACKEND_URL,
    headers: {
      tenant: uid,
    },
  };
};

// General function for handling requests with appropriate error handling
const handleRequest = async (url, method = 'get', data = null) => {
  const { BACKEND_URL, headers } = await getAuthHeaders();
  try {
    const response = await axios({
      url: `${BACKEND_URL}${url}`,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An unexpected error occurred');
  }
};

// Thunks
export const fetchHeats = createAsyncThunk('heats/fetchHeats', () => handleRequest('/heats'));

export const addHeats = createAsyncThunk('heats/addHeats', async () => {
  const { BACKEND_URL, headers } = await getAuthHeaders();
  try {
    const [entries, currentHeats, schedules] = await Promise.all([
      axios.get(`${BACKEND_URL}/entries`, { headers }),
      axios.get(`${BACKEND_URL}/heats`, { headers }),
      axios.get(`${BACKEND_URL}/schedules`, { headers }),
    ]);
    const generatedHeats = autoGenerateHeats(schedules.data, entries.data, currentHeats.data);
    const response = await axios.post(`${BACKEND_URL}/heats`, generatedHeats, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add heats');
  }
});

export const addOneHeat = createAsyncThunk('heats/addOneHeat', (heatData) => handleRequest('/heats', 'post', heatData));

export const getOneHeat = createAsyncThunk('heats/getOneHeat', (id) => handleRequest(`/heats/${id}`));

export const deleteHeat = createAsyncThunk('heats/deleteHeat', (id) => handleRequest(`/heats/${id}`, 'delete'));

// Slice
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
