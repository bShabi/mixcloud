import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async ({ query, offset = 0 }, thunkAPI) => {
    try {
      const response = await axios.get('https://api.mixcloud.com/search', {
        params: {
          q: query,
          type: 'cloudcast',
          limit: 6,
          offset,
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    loading: false,
    error: null,
    offset: 0,
    hasMore: true,
    recentSearches: [],
    artistSelected: null,
  },
  reducers: {
    resetSearch(state, action) {
      state.query = action.payload || '';
      state.results = [];
      state.offset = 0;
      state.hasMore = false;
      state.error = null;
    },
    addRecentSearch(state, action) {
      if(!state.recentSearches.includes(action.payload)) {
        if (state.recentSearches.length >= 5) {
          state.recentSearches.shift(); // Remove the oldest search if we have 5
        }
        // Add the new search term to the end of the array
        state.recentSearches.push(action.payload);
      }
    },
    selectedArtist(state, action) {
      state.artistSelected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.results = action.payload.data;
      if(state.results.length === 0) {
        state.error = 'No results found';
      }
      state.offset += 6;
      state.hasMore = !!action.payload.paging?.next;
      state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { resetSearch ,addRecentSearch,selectedArtist} = searchSlice.actions;
export default searchSlice.reducer;
