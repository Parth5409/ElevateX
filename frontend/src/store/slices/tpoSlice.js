import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as tpoService from '../../services/tpoService';

const initialState = {
  analytics: null,
  students: [],
  internships: [],
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk('tpo/fetchAnalytics', async (_, { rejectWithValue }) => {
  try {
    return await tpoService.getTpoAnalytics();
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch analytics');
  }
});

export const fetchAllStudents = createAsyncThunk('tpo/fetchAllStudents', async (filters, { rejectWithValue }) => {
  try {
    return await tpoService.listStudents(filters);
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch students');
  }
});

export const fetchAllInternships = createAsyncThunk('tpo/fetchAllInternships', async (filters, { rejectWithValue }) => {
  try {
    return await tpoService.listInternships(filters);
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch internships');
  }
});

export const updateInternship = createAsyncThunk('tpo/updateInternship', async ({ id, status }, { rejectWithValue }) => {
  try {
    await tpoService.updateInternshipStatus(id, status);
    return { id, status };
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to update internship');
  }
});

const tpoSlice = createSlice({
  name: 'tpo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(fetchAllInternships.fulfilled, (state, action) => {
        state.internships = action.payload;
      })
      .addCase(updateInternship.fulfilled, (state, action) => {
        const index = state.internships.findIndex(i => i._id === action.payload.id);
        if (index !== -1) {
          state.internships[index].status = action.payload.status;
        }
      });
  },
});

export default tpoSlice.reducer;
