import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getUrl from './getUrl';

const initialState = {
  schedules: [],
  schedule: {},
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

// General function for handling API requests
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
export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', () => handleRequest('/schedules'));

export const getOneSchedule = createAsyncThunk('schedules/getOneSchedule', (id) => handleRequest(`/schedules/${id}`));

export const addSchedule = createAsyncThunk('schedules/addSchedule', (scheduleData) => handleRequest('/schedules', 'post', scheduleData));

export const deleteSchedule = createAsyncThunk('schedules/deleteSchedule', (id) => handleRequest(`/schedules/${id}`, 'delete'));

export const editSchedule = createAsyncThunk('schedules/editSchedule', (params) => handleRequest(`/schedules/${params.id}`, 'put', params));

// Slice
export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getOneSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOneSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedule = action.payload;
      })
      .addCase(getOneSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedules = action.payload;
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedules = action.payload;
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(editSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedules = action.payload;
      })
      .addCase(editSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default schedulesSlice.reducer;
