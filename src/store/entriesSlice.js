import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getUrl from './getUrl';

const initialState = {
  entries: [],
  entry: {},
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

// Generalized function to handle HTTP requests with custom error handling
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
export const fetchEntries = createAsyncThunk('entries/fetchEntries', () => handleRequest('/entries'));

export const getOneEntry = createAsyncThunk('entries/getOneEntry', (id) => handleRequest(`/entries/${id}`));

export const addEntry = createAsyncThunk('entries/addEntry', (entryData) => handleRequest('/entries', 'post', entryData));

export const deleteEntry = createAsyncThunk('entries/deleteEntry', (id) => handleRequest(`/entries/${id}`, 'delete'));

export const editEntry = createAsyncThunk('entries/editEntry', (params) => handleRequest(`/entries/${params.id}`, 'put', params));

// Helper function for handling common loading and error state
const handlePending = (state) => {
  state.status = 'loading';
};

const handleRejected = (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
};

// Slice
export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, handlePending)
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, handleRejected)

      .addCase(getOneEntry.pending, handlePending)
      .addCase(getOneEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entry = action.payload;
      })
      .addCase(getOneEntry.rejected, handleRejected)

      .addCase(addEntry.pending, handlePending)
      .addCase(addEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(addEntry.rejected, handleRejected)

      .addCase(deleteEntry.pending, handlePending)
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(deleteEntry.rejected, handleRejected)

      .addCase(editEntry.pending, handlePending)
      .addCase(editEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entry = action.payload;
      })
      .addCase(editEntry.rejected, handleRejected);
  },
});

export default entriesSlice.reducer;
