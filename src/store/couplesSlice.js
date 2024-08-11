import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkCouples } from 'src/utils/checkCouples';

const initialState = {
  couples: [],
  couple: {},
  status: 'idle',
  error: null,
};

export const fetchCouples = createAsyncThunk('couples/fetchCouples', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/couples`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getOneCouple = createAsyncThunk('couples/getOneCouple', async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/couples/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const addCouple = createAsyncThunk('couples/addCouple', async (coupleData) => {
  try {
    const couples = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/couples`);
    const newArray = await checkCouples(couples, coupleData);
    for (const couple of newArray) {
      await axios.post(`${import.meta.env.VITE_BACKEND_DEV}/couples`, couple);
    }
    const newCouples = await axios.get(`${import.meta.env.VITE_BACKEND_DEV}/couples`);
    return newCouples.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteCouple = createAsyncThunk('couples/deleteCouple', async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_DEV}/couples/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const editCouple = createAsyncThunk('couples/editCouple', async (params) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_DEV}/couples/${params.id}`, params);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const couplesSlice = createSlice({
  name: 'couples',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouples.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCouples.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.couples = action.payload;
      })
      .addCase(fetchCouples.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOneCouple.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOneCouple.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.couple = action.payload;
      })
      .addCase(getOneCouple.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCouple.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCouple.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.couples = action.payload;
      })
      .addCase(addCouple.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCouple.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCouple.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.couples = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(deleteCouple.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editCouple.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editCouple.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.couple = action.payload;
      })
      .addCase(editCouple.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default couplesSlice.reducer;
