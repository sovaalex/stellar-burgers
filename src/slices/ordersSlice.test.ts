import { expect, test, describe, jest } from '@jest/globals';
import {
  ordersSlice,
  getOrders,
  placeOrder,
  getOrderByNumber
} from './ordersSlice';
import { ordersInitialState } from './ordersSlice';

afterAll(() => {
  jest.clearAllMocks();
});

describe('тесты редьюсера ordersSlice', () => {
  test('должен обрабатывать getOrders.pending', () => {
    const newState = ordersSlice.reducer(
      ordersInitialState,
      getOrders.pending('')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать getOrders.fulfilled', () => {
    const mockOrders = [
      {
        _id: '1',
        status: 'done',
        name: 'Order 1',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        number: 1,
        ingredients: []
      }
    ];
    const newState = ordersSlice.reducer(
      ordersInitialState,
      getOrders.fulfilled(mockOrders, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(mockOrders);
  });

  test('должен обрабатывать getOrders.rejected', () => {
    const errorMessage = 'Failed to get orders';
    const newState = ordersSlice.reducer(
      ordersInitialState,
      getOrders.rejected(new Error(errorMessage), '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  test('должен обрабатывать placeOrder.pending', () => {
    const newState = ordersSlice.reducer(
      ordersInitialState,
      placeOrder.pending('', [])
    );

    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать placeOrder.fulfilled', () => {
    const mockOrder = {
      _id: '1',
      status: 'done',
      name: 'New Order',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      number: 1,
      ingredients: []
    };
    const newState = ordersSlice.reducer(
      ordersInitialState,
      placeOrder.fulfilled({ order: mockOrder, ingredients: [] }, '', [])
    );

    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toEqual(mockOrder);
  });

  test('должен обрабатывать placeOrder.rejected', () => {
    const errorMessage = 'Failed to place order';
    const newState = ordersSlice.reducer(
      ordersInitialState,
      placeOrder.rejected(new Error(errorMessage), '', [])
    );

    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  test('должен обрабатывать getOrderByNumber.pending', () => {
    const newState = ordersSlice.reducer(
      ordersInitialState,
      getOrderByNumber.pending('', 1)
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать getOrderByNumber.fulfilled', () => {
    const mockOrder = {
      _id: '1',
      status: 'done',
      name: 'Order by number',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      number: 1,
      ingredients: []
    };
    const newState = ordersSlice.reducer(
      ordersInitialState,
      getOrderByNumber.fulfilled({ success: true, orders: [mockOrder] }, '', 1)
    );

    expect(newState.loading).toBe(false);
    expect(newState.orderModalData).toEqual(mockOrder);
  });

  test('должен обрабатывать getOrderByNumber.rejected', () => {
    const errorMessage = 'Failed to get order';
    const newState = ordersSlice.reducer(
      ordersInitialState,
      getOrderByNumber.rejected(new Error(errorMessage), '', 1)
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});
