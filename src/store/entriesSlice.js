import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  entries: [],
  entry: {},
  status: 'idle',
  error: null,
};

export const fetchEntries = createAsyncThunk('entries/fetchEntries', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/entries`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getOneEntry = createAsyncThunk('entries/getOneEntry', async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/entries/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const addEntry = createAsyncThunk('entries/addEntry', async (entryData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DEV}/entries`, entryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteEntry = createAsyncThunk('entries/deleteEntry', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_DEV}/entries/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const editEntry = createAsyncThunk('entries/editEntry', async (params) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_DEV}/entries/${params.id}`, params);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOneEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOneEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entry = action.payload;
      })
      .addCase(getOneEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(addEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entry = action.payload;
      })
      .addCase(editEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default entriesSlice.reducer;
