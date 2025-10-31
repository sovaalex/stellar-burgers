import { expect, test, describe, jest } from '@jest/globals';
import { ingredientsSlice, fetchIngredients } from './ingredientsSlice';
import { ingredientsInitialState } from './ingredientsSlice';

afterAll(() => {
  jest.clearAllMocks();
});

describe('тесты редьюсера ingredientsSlice', () => {
  test('должен обрабатывать fetchIngredients.pending', () => {
    const newState = ingredientsSlice.reducer(
      ingredientsInitialState,
      fetchIngredients.pending('')
    );

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Test Ingredient',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'test.png',
        image_mobile: 'test-mobile.png',
        image_large: 'test-large.png'
      }
    ];

    const newState = ingredientsSlice.reducer(
      ingredientsInitialState,
      fetchIngredients.fulfilled(mockIngredients, '')
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.data).toEqual(mockIngredients);
  });

  test('должен обрабатывать fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const newState = ingredientsSlice.reducer(
      ingredientsInitialState,
      fetchIngredients.rejected(new Error(errorMessage), '')
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});
