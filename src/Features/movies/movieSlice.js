import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKeys";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Pearl";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=movie`
    );
    return response.data; 
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Mother";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&i=${id}&Plot=full`
    );
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
  loading: false,
  
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("loading...");
        state.loading = true;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("fetched succesfully..!");
        return { ...state, loading: false, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected...");
      })
      .addCase(fetchAsyncShows.pending, (state) => {
        console.log("loading...");
        state.loading = true;
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("fetched successfully..!");
        return { ...state, loading: false, shows: payload };
      })

      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("fetched succesfully..!");
        return { ...state, selectMovieOrShow: payload };
      });
  },
});

export const { removeSelectedMovieOrShow } = moviesSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export const getLoading = (state) => state.movies.loading;
export default moviesSlice.reducer;
