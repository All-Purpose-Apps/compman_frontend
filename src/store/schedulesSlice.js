import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const uid = user ? user.uid : '';
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_DEV}${user.role}`;

const initialState = {
  schedules: [],
  schedule: {},
  status: 'idle',
  error: null,
};

export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/schedules`, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getOneSchedule = createAsyncThunk('schedules/getOneSchedule', async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/schedules/${id}`, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const addSchedule = createAsyncThunk('schedules/addSchedule', async (scheduleData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/schedules`, scheduleData, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteSchedule = createAsyncThunk('schedules/deleteSchedule', async (id) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/schedules/${id}`, {
      headers: {
        tenant: uid,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const editSchedule = createAsyncThunk('schedules/editSchedule', async (params) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/schedules/${params.id}`, params, {
      headers: {
        tenant: uid,
      },
    });
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
