import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import genreSelect from '../components/genreSelect/genreSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    genres: genreSelect,
  },
});