import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getUrl from './getUrl';

const initialState = {
  dancers: [],
  dancer: {},
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

// Generalized thunk to handle HTTP requests with custom error handling
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
    throw new Error(error?.response?.data?.error || 'An unexpected error occurred');
  }
};

// Thunks
export const fetchDancers = createAsyncThunk('dancers/fetchDancers', () => handleRequest('/dancers'));

export const getOneDancer = createAsyncThunk('dancers/getOneDancer', (id) => handleRequest(`/dancers/${id}`));

export const addDancer = createAsyncThunk('dancers/addDancer', (dancerData) => handleRequest('/dancers', 'post', dancerData));

export const editDancer = createAsyncThunk('dancers/editDancer', (dancerData) => handleRequest(`/dancers/${dancerData.id}`, 'put', dancerData));

export const deleteDancer = createAsyncThunk('dancers/deleteDancer', (id) => handleRequest(`/dancers/${id}`, 'delete'));

// Helper function for handling common loading and error state
const handlePending = (state) => {
  state.status = 'loading';
};

const handleRejected = (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
};

// Slice
export const dancersSlice = createSlice({
  name: 'dancers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDancers.pending, handlePending)
      .addCase(fetchDancers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancers = action.payload;
      })
      .addCase(fetchDancers.rejected, handleRejected)

      .addCase(getOneDancer.pending, handlePending)
      .addCase(getOneDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancer = action.payload;
      })
      .addCase(getOneDancer.rejected, handleRejected)

      .addCase(addDancer.pending, handlePending)
      .addCase(addDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancers = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addDancer.rejected, handleRejected)

      .addCase(editDancer.pending, handlePending)
      .addCase(editDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancer = action.payload;
      })
      .addCase(editDancer.rejected, handleRejected)

      .addCase(deleteDancer.pending, handlePending)
      .addCase(deleteDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancers = state.dancers.filter((dancer) => dancer.id !== action.payload.id);
      })
      .addCase(deleteDancer.rejected, handleRejected);
  },
});

export default dancersSlice.reducer;
