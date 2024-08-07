import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dancers: [],
  dancer: {},
  status: 'idle',
  error: null,
};

export const fetchDancers = createAsyncThunk('dancers/fetchDancers', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/dancers`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getOneDancer = createAsyncThunk('dancers/getOneDancer', async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/dancers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const addDancer = createAsyncThunk('dancers/addDancer', async (dancerData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DEV}/dancers`, dancerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const editDancer = createAsyncThunk('dancers/editDancer', async (dancerData) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_DEV}/dancers/${dancerData.id}`, dancerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteDancer = createAsyncThunk('dancers/deleteDancer', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_DEV}/dancers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const dancersSlice = createSlice({
  name: 'dancers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDancers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDancers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancers = state.dancers = action.payload;
      })
      .addCase(fetchDancers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOneDancer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getOneDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancer = action.payload;
      })
      .addCase(getOneDancer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDancer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancers = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addDancer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editDancer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(editDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancer = action.payload;
      })
      .addCase(editDancer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteDancer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteDancer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dancers = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(deleteDancer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dancersSlice.reducer;
