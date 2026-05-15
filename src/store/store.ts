import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import moodSlice from './slices/moodSlice';
import chatSlice from './slices/chatSlice';
import crisisSlice from './slices/crisisSlice';
import appointmentSlice from './slices/appointmentSlice';
import communitySlice from './slices/communitySlice';
import librarySlice from './slices/librarySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    mood: moodSlice,
    chat: chatSlice,
    crisis: crisisSlice,
    appointments: appointmentSlice,
    community: communitySlice,
    library: librarySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;