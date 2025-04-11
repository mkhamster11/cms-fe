

// src/redux/homeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchHomeContent = createAsyncThunk('home/fetch', async () => {
  const res = await axios.get('home/');
  return res.data;
});

export const updateSection = createAsyncThunk(
  'home/update',
  async ({ section, data }: { section: string; data: any }) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const res = await axios.put(`home/${section}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return { section, data: res.data };
  }
);

type HomeSection = {
  title?: string;
  subtitle?: string;
  image?: string;
};
  
type HomeState = {
    content: {
      [key: string]: HomeSection;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  };
  

const initialState: HomeState = {
    content: {},
    status: 'idle',
  };
  
  const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchHomeContent.fulfilled, (state, action) => {
          state.content = action.payload;
        })
        .addCase(updateSection.fulfilled, (state, action) => {
          const { section, data } = action.payload;
          state.content[section] = data;
        });
    },
  });
  
  export default homeSlice.reducer;
