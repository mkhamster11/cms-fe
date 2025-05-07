

// src/redux/homeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchHomeContent = createAsyncThunk('home/fetch', async () => {
  const res = await axios.get('page/home');
  console.log("res",res.data)
  return res.data;
});


type HomeSection = {
  id: number;
  section_type: string;
  order: number;
  content: any;
};

type HomeContent = {
  slug: string;
  title: string;
  sections: HomeSection[]; // <-- this must be an array
};

type HomeState = {
  content: HomeContent | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};
  

const initialState: HomeState = {
  content: null,
  status: 'idle',
};

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
        if (state.content) {
          const index = state.content.sections.findIndex(
            (s) => s.section_type === section
          );
          if (index !== -1) {
            // 👇 Choose one based on what 'data' contains
            state.content.sections[index] = data; // If full section
            // OR
            // state.content.sections[index].content = data.content; // If only content
          }
        }
      });
  },
});

export default homeSlice.reducer;
