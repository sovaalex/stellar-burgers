import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';

export const getFeed = createAsyncThunk('feed/getFeed', async () => {
  const response = await getFeedsApi();
  return response;
});

type TFeedState = {
  feed: TOrdersData | null;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  feed: null,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get feed';
      });
  }
});

export { initialState as feedInitialState };
