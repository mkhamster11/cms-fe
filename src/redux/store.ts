// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import homeReducer from '../features/auth/homeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

// Pages and Components will follow next.
