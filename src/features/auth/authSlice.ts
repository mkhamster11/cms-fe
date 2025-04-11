// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginUser } from '../auth/authAPI';

// interface AuthState {
//   user: any;
//   token: string | null;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
// }

// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem('token'),
//   status: 'idle',
// };

// export const login = createAsyncThunk('auth/login', async (credentials: { email: string, password: string }) => {
//   const response = await loginUser(credentials);
//   return response;
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.fulfilled, (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       localStorage.setItem('token', action.payload.token);
//     });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;





// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
  const response = await axios.post('token/', credentials);
  localStorage.setItem('access', response.data.access);
  return response.data.access;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { access: localStorage.getItem('access') },
  reducers: {
    logout: (state) => {
      state.access = null;
      localStorage.removeItem('access');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.access = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
