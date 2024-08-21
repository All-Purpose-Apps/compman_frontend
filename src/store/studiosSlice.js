import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  studios: [],
  studio: {},
  status: 'idle',
  error: null,
};

export const fetchStudios = createAsyncThunk('studios/fetchStudios', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/studios`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getOneStudio = createAsyncThunk('studios/getOneStudio', async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/studios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addStudio = createAsyncThunk('studios/addStudio', async (studioData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DEV}/studios`, studioData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const editStudio = createAsyncThunk('studios/editStudio', async (studioData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_DEV}/studios/${studioData.id}`, studioData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteStudio = createAsyncThunk('studios/deleteStudio', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_DEV}/studios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudios.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchStudios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchStudios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOneStudio.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getOneStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studio = action.payload;
      })
      .addCase(getOneStudio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudio.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addStudio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editStudio.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(editStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studio = action.payload;
      })
      .addCase(editStudio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteStudio.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteStudio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(deleteStudio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default studiosSlice.reducer;
