import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchMovies = createAsyncThunk('movies/getMovies', async ([pageIndex, queryType, requestType])=> {
  const response = await axios.get(`https://api.themoviedb.org/3/${requestType}/${queryType}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${pageIndex}`);
  return response.data; 
});

export const searchMulti = createAsyncThunk('movies/searchMovies', async ([query, pageIndex])=> {
  try {
    const response = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&language=en-US&page=${pageIndex}&include_adult=false`),
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&language=en-US&page=${pageIndex}&include_adult=false`)
    ]);
    let result = [response[0].data, response[1].data];  
    return result;

  } catch(err){
    console.log(err.message);
  }
  
});

export const fetchMovieDetails = createAsyncThunk('movies/getMovieDetails', async ([id, name])=> {
    try {
      const response = await Promise.allSettled([
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`),
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)
      ])
      let result = [response[0]?.value?.data, response[1]?.value?.data];
      let target = result.filter(item => item?.title === name || item?.name === name);
      let targetIndex = result.indexOf(target[0]);
      let detailsTarget = targetIndex === 0 ? 'movie' : targetIndex === 1 ? 'tv' : undefined;
      return [target[0], detailsTarget]; 
    } catch(err){
      console.log(err.message);
    }
});

export const fetchVideos = createAsyncThunk('movies/getVideos', async ({choiceId, detailsTarget})=> {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${detailsTarget}/${choiceId}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`);
      let filterTarget = response.data.results.filter(video => video.type === 'Trailer'); 
      return filterTarget;
    } catch(err){
      console.log(err.message);
    }
});



export const moviesReducer = createSlice({

  name: 'movies',
  initialState: {
    movieList: [],
    movieDetails: {},
    detailsTarget: '',
    videos: [],
    status: '',
    queryType: '',
    query: '',
    pageIndex: 1,
    totalPages: 0,
    choiceId: null,
  },
  reducers: {
    increasePageIndex(state, action){
      state.pageIndex += 1
    },
    decreasePageIndex(state, action){
      state.pageIndex -= 1
    },
    setPageIndex(state, action){
      state.pageIndex = action.payload;
    },
    setQueryType(state, action) {
      state.queryType = action.payload;
    },
    setQuery(state, action){
      state.query = action.payload;
    },
    setChoiceId(state, action) {
      state.choiceId = action.payload;
    },
    setMovieDetails(state, action){
      state.movieDetails = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state, action)=>{
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action)=>{
        state.status = 'success';
        state.movieList = action.payload.results;
        state.pageIndex = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action)=>{
        state.status = 'rejected';
      })
      .addCase(searchMulti.pending, (state, action)=>{
        state.status = 'loading';
      })
      .addCase(searchMulti.fulfilled, (state, action)=>{
        state.status = 'success';
        state.movieList = [...action.payload[0].results, ...action.payload[1].results];
        state.pageIndex = action.payload[0].page;
        state.totalPages = action.payload[0].total_pages + action.payload[1].total_pages;
      })
      .addCase(searchMulti.rejected, (state, action)=>{
        state.status = 'rejected';
      })
      .addCase(fetchMovieDetails.pending, (state, action)=> {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action)=>{
        state.status = 'success';
        state.movieDetails = action.payload[0];
        state.detailsTarget = action.payload[1];
      })
      .addCase(fetchMovieDetails.rejected, (state, action)=>{
        state.status = 'rejected';
      })
      .addCase(fetchVideos.pending, (state, action)=> {
        state.status = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action)=>{
        state.status = 'success';
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action)=>{
        state.status = 'rejected';
      })
  }

});



export const { increasePageIndex, decreasePageIndex, setQueryType, setQuery, setPageIndex, setChoiceId, setMovieDetails } = moviesReducer.actions;

export default moviesReducer.reducer;