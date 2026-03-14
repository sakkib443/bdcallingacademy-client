import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Async fetch from backend API
export const fetchCoursesData = createAsyncThunk(
  "courses/fetchCoursesData",
  async () => {
    const response = await fetch(`${API_URL}/api/courses`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error("Failed to fetch courses");
    const result = await response.json();
    // API returns {success: true, data: [...]} so extract data array
    return result.data || result;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesData.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCoursesData.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
