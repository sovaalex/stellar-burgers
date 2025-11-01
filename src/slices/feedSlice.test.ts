import { expect, test, describe, jest } from '@jest/globals';
import { feedSlice, getFeed, feedInitialState } from './feedSlice';

afterAll(() => {
  jest.clearAllMocks();
});

describe('тесты редьюсера feedSlice', () => {
  test('должен обрабатывать getFeed.pending', () => {
    const newState = feedSlice.reducer(feedInitialState, getFeed.pending(''));

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать getFeed.fulfilled', () => {
    const mockFeed = { success: true, orders: [], total: 0, totalToday: 0 };
    const newState = feedSlice.reducer(
      feedInitialState,
      getFeed.fulfilled(mockFeed, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.feed).toEqual(mockFeed);
  });

  test('должен обрабатывать getFeed.rejected', () => {
    const errorMessage = 'Failed to get feed';
    const newState = feedSlice.reducer(
      feedInitialState,
      getFeed.rejected(new Error(errorMessage), '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});
