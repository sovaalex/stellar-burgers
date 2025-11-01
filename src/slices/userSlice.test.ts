import { expect, test, describe, jest } from '@jest/globals';
import {
  userSlice,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassword
} from './userSlice';
import { userInitialState } from './userSlice';

jest.mock('../utils/cookie');

afterAll(() => {
  jest.clearAllMocks();
});

const mockUser = { name: 'Test User', email: 'test@example.com' };
const mockRegisterData = {
  email: 'test@example.com',
  name: 'Test',
  password: 'password'
};
const mockLoginData = {
  email: 'test@example.com',
  password: 'password'
};

describe('тесты редьюсера userSlice', () => {
  test('должен обрабатывать registerUser.pending', () => {
    const newState = userSlice.reducer(
      userInitialState,
      registerUser.pending('', {
        email: 'test@example.com',
        name: 'Test',
        password: 'password'
      })
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать registerUser.fulfilled', () => {
    const newState = userSlice.reducer(
      userInitialState,
      registerUser.fulfilled(mockUser, '', mockRegisterData)
    );

    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать registerUser.rejected', () => {
    const errorMessage = 'Registration failed';
    const newState = userSlice.reducer(
      userInitialState,
      registerUser.rejected(new Error(errorMessage), '', mockRegisterData)
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  test('должен обрабатывать loginUser.pending', () => {
    const newState = userSlice.reducer(
      userInitialState,
      loginUser.pending('', mockLoginData)
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать loginUser.fulfilled', () => {
    const newState = userSlice.reducer(
      userInitialState,
      loginUser.fulfilled(mockUser, '', mockLoginData)
    );

    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать loginUser.rejected', () => {
    const errorMessage = 'Login failed';
    const newState = userSlice.reducer(
      userInitialState,
      loginUser.rejected(new Error(errorMessage), '', mockLoginData)
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  test('должен обрабатывать getUser.pending', () => {
    const newState = userSlice.reducer(userInitialState, getUser.pending(''));

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать getUser.fulfilled', () => {
    const newState = userSlice.reducer(
      userInitialState,
      getUser.fulfilled(mockUser, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать getUser.rejected', () => {
    const errorMessage = 'Failed to get user';
    const newState = userSlice.reducer(
      userInitialState,
      getUser.rejected(new Error(errorMessage), '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('должен обрабатывать updateUser.pending', () => {
    const newState = userSlice.reducer(
      userInitialState,
      updateUser.pending('', {})
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать updateUser.fulfilled', () => {
    const newState = userSlice.reducer(
      userInitialState,
      updateUser.fulfilled(mockUser, '', {})
    );

    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(mockUser);
  });

  test('должен обрабатывать updateUser.rejected', () => {
    const errorMessage = 'Update failed';
    const newState = userSlice.reducer(
      userInitialState,
      updateUser.rejected(new Error(errorMessage), '', {})
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  test('должен обрабатывать logoutUser.pending', () => {
    const newState = userSlice.reducer(
      userInitialState,
      logoutUser.pending('')
    );

    expect(newState.loading).toBe(true);
  });

  test('должен обрабатывать logoutUser.fulfilled', () => {
    const newState = userSlice.reducer(
      userInitialState,
      logoutUser.fulfilled(undefined, '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('должен обрабатывать logoutUser.rejected', () => {
    const errorMessage = 'Logout failed';
    const newState = userSlice.reducer(
      userInitialState,
      logoutUser.rejected(new Error(errorMessage), '')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  test('должен обрабатывать forgotPassword.pending', () => {
    const newState = userSlice.reducer(
      userInitialState,
      forgotPassword.pending('', 'email@example.com')
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать forgotPassword.fulfilled', () => {
    const newState = userSlice.reducer(
      userInitialState,
      forgotPassword.fulfilled({ success: true }, '', 'email@example.com')
    );

    expect(newState.loading).toBe(false);
  });

  test('должен обрабатывать forgotPassword.rejected', () => {
    const errorMessage = 'Forgot password failed';
    const newState = userSlice.reducer(
      userInitialState,
      forgotPassword.rejected(new Error(errorMessage), '', 'email@example.com')
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  test('должен обрабатывать resetPassword.pending', () => {
    const newState = userSlice.reducer(
      userInitialState,
      resetPassword.pending('', { password: 'newpass', token: 'token' })
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('должен обрабатывать resetPassword.fulfilled', () => {
    const newState = userSlice.reducer(
      userInitialState,
      resetPassword.fulfilled({ success: true }, '', {
        password: 'newpass',
        token: 'token'
      })
    );

    expect(newState.loading).toBe(false);
  });

  test('должен обрабатывать resetPassword.rejected', () => {
    const errorMessage = 'Reset password failed';
    const newState = userSlice.reducer(
      userInitialState,
      resetPassword.rejected(new Error(errorMessage), '', {
        password: 'newpass',
        token: 'token'
      })
    );

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});
