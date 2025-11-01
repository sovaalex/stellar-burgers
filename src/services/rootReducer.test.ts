import { expect, test, describe, jest } from '@jest/globals';
import rootReducer from './rootReducer';
import { ingredientsInitialState } from '../slices/ingredientsSlice';
import { constructorInitialState } from '../slices/constructorSlice';
import { userInitialState } from '../slices/userSlice';
import { ordersInitialState } from '../slices/ordersSlice';
import { feedInitialState } from '../slices/feedSlice';

afterAll(() => {
  jest.clearAllMocks();
});

describe('тесты rootReducer', () => {
  const initialState = {
    ingredients: { ...ingredientsInitialState },
    burgerConstructor: { ...constructorInitialState },
    user: { ...userInitialState },
    orders: { ...ordersInitialState },
    feed: { ...feedInitialState }
  };

  test('должен вернуть правильный initialState', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});
