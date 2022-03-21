import { authApi, LoginCredentials, userApi, RegisterUserBody } from '@api';
import { TokenStorage } from '@lib/token';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from './types';

export interface UserState {
  user: User | null;
  isAuthorized: boolean;
  isSessionInited: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  isSessionInited: false,
};

export const sessionSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    sessionInited: (state) => {
      state.isSessionInited = true;
    },
  },
});

/**
 * Получение текущего пользователя
 */
export const getCurrentUserThunk = createAsyncThunk(
  'users/me',
  async (_, thunkApi) => {
    const user = await userApi.getCurrentUser();
    thunkApi.dispatch(setUser(user));
  },
);

/**
 * Инициализация сессии
 */
export const initSession = createAsyncThunk(
  'auth/init',
  async (_, { dispatch }) => {
    TokenStorage.getToken() && dispatch(setIsAuthorized(true));
    dispatch(sessionInited());
    return;
  },
);

/**
 * Логаут
 */
export const logoutThunk = createAsyncThunk(
  'auth/login',
  async (_, thunkApi) => {
    authApi.logout();
    TokenStorage.clear();
    thunkApi.dispatch(setIsAuthorized(false));
  },
);

export const { setUser, clearUser, setIsAuthorized, sessionInited } =
  sessionSlice.actions;
