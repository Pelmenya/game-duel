import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { gameSettingsReducer } from './slices/gameSettingsSlice';

const isDev = process.env.NODE_ENV !== 'production';
const middlewares = isDev && typeof window === 'object' ? [logger] : [];


export const store = configureStore({
  reducer: {
    gameSettings: gameSettingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    ...middlewares,
  ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
