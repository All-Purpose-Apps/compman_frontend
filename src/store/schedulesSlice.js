import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  schedules: [],
  schedule: {},
  status: 'idle',
  error: null,
};

export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/schedules`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getOneSchedule = createAsyncThunk('schedules/getOneSchedule', async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/schedules/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const addSchedule = createAsyncThunk('schedules/addSchedule', async (scheduleData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DEV}/schedules`, scheduleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteSchedule = createAsyncThunk('schedules/deleteSchedule', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_DEV}/schedules/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const editSchedule = createAsyncThunk('schedules/editSchedule', async (params) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_DEV}/schedules/${params.id}`, params);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.schedules = action.payload;
    });
    builder.addCase(fetchSchedules.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(getOneSchedule.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getOneSchedule.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.schedule = action.payload;
    });
    builder.addCase(getOneSchedule.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addSchedule.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addSchedule.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.schedules = action.payload;
    });
    builder.addCase(addSchedule.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(deleteSchedule.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteSchedule.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.schedules = action.payload;
    });
    builder.addCase(deleteSchedule.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(editSchedule.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(editSchedule.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.schedules = action.payload;
    });
    builder.addCase(editSchedule.rejected, (state, action) => {
      state.status;
      state.error = action.error.message;
    });
  },
});

export default schedulesSlice.reducer;
