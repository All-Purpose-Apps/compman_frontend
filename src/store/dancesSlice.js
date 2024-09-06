import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getUrl from './getUrl';

const initialState = {
  dances: [],
  danceCategories: [],
  status: 'idle',
  error: null,
};

// Utility function to get headers for the request
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

// Generalized function to handle HTTP requests
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
export const fetchDances = createAsyncThunk('dances/fetchDances', () => handleRequest('/dances'));

export const fetchDanceCategories = createAsyncThunk('dances/fetchDanceCategories', () => handleRequest('/danceCategory'));

export const turnOnOffDanceCategory = createAsyncThunk('dances/turnOnOffDanceCategory', (danceCategory) =>
  handleRequest(`/danceCategory/${danceCategory._id}`, 'put', danceCategory)
);

// Slice
export const dancesSlice = createSlice({
  name: 'dances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Dances
      .addCase(fetchDances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dances = action.payload.filter((dance) => dance.danceCategory.turnedOn);
      })
      .addCase(fetchDances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch Dance Categories
      .addCase(fetchDanceCategories.pending, (state) => {
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

      // Turn On/Off Dance Category
      .addCase(turnOnOffDanceCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(turnOnOffDanceCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.danceCategories = state.danceCategories.map((category) => (category._id === action.payload._id ? action.payload : category));
      })
      .addCase(turnOnOffDanceCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dancesSlice.reducer;
