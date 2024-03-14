import { configureStore } from '@reduxjs/toolkit';
import { jokesReducer } from '../reducers/jokesReducer';

export const store = configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
