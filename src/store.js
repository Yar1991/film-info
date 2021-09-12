import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './components/Movies/moviesReducer';


const store = configureStore({
  reducer: {
    movies: moviesReducer
  }
});

export default store;