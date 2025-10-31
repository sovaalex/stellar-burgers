import { expect, test, describe, jest } from '@jest/globals';
import { constructorSlice } from './constructorSlice';

import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TIngredient, TConstructorIngredient } from '../utils/types';

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'unique-id-1'
};

const mockIngredient2: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0945',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  id: 'unique-id-2'
};

const initialState = {
  bun: null,
  ingredients: []
};

afterAll(() => {
  jest.clearAllMocks();
});

describe('тесты редьюсера constructorSlice', () => {
  test('должен обрабатывать addIngredient с булочкой', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(mockBun)
    );

    expect(newState.bun).toEqual(mockBun);
    expect(newState.ingredients).toEqual([]);
  });

  test('должен обрабатывать addIngredient с ингредиентом', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([mockIngredient]);
  });

  test('должен обрабатывать removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [mockIngredient]
    };

    const newState = constructorSlice.reducer(
      stateWithIngredient,
      removeIngredient('unique-id-1')
    );

    expect(newState.ingredients).toEqual([]);
  });

  test('должен обрабатывать moveIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIngredient, mockIngredient2]
    };

    const newState = constructorSlice.reducer(
      stateWithIngredients,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(newState.ingredients).toEqual([mockIngredient2, mockIngredient]);
  });

  test('должен обрабатывать clearConstructor', () => {
    const stateWithData = {
      bun: mockBun,
      ingredients: [mockIngredient]
    };

    const newState = constructorSlice.reducer(
      stateWithData,
      clearConstructor()
    );

    expect(newState).toEqual(initialState);
  });
});
