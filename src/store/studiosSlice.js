import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getUrl from './getUrl';

const initialState = {
  studios: [],
  studio: {},
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

// Helper function for handling API requests
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
    throw new Error(error?.response?.data?.message || error?.response?.data?.error || 'An unexpected error occurred');
  }
};

// Thunks
export const fetchStudios = createAsyncThunk('studios/fetchStudios', () => handleRequest('/studios'));

export const getOneStudio = createAsyncThunk('studios/getOneStudio', (id) => handleRequest(`/studios/${id}`));

export const addStudio = createAsyncThunk('studios/addStudio', (studioData) => handleRequest('/studios', 'post', studioData));

export const editStudio = createAsyncThunk('studios/editStudio', (studioData) => handleRequest(`/studios/${studioData.id}`, 'put', studioData));

export const deleteStudio = createAsyncThunk('studios/deleteStudio', (id) => handleRequest(`/studios/${id}`, 'delete'));

// Slice
export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = 'loading';
    };
    const handleRejected = (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    };

    builder
      // Fetch Studios
      .addCase(fetchStudios.pending, handlePending)
      .addCase(fetchStudios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchStudios.rejected, handleRejected)

      // Get One Studio
      .addCase(getOneStudio.pending, handlePending)
      .addCase(getOneStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studio = action.payload;
      })
      .addCase(getOneStudio.rejected, handleRejected)

      // Add Studio
      .addCase(addStudio.pending, handlePending)
      .addCase(addStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addStudio.rejected, handleRejected)

      // Edit Studio
      .addCase(editStudio.pending, handlePending)
      .addCase(editStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studio = action.payload;
      })
      .addCase(editStudio.rejected, handleRejected)

      // Delete Studio
      .addCase(deleteStudio.pending, handlePending)
      .addCase(deleteStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(deleteStudio.rejected, handleRejected);
  },
});

export default studiosSlice.reducer;
