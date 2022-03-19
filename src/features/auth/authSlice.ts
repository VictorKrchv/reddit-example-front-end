import { authApi, LoginCredentials, userApi, RegisterUserBody } from '@api';
import { TokenStorage } from '@lib/token';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { User } from './types';

export interface UserState {
  user: User | null;
  isAuthorized: boolean;
  isSessionInited: boolean;
  login: {
    error: string;
    isLoading: boolean;
  };
  registration: {
    error: string;
    isLoading: boolean;
  };
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  isSessionInited: false,
  login: {
    error: '',
    isLoading: false,
  },
  registration: {
    error: '',
    isLoading: false,
  },
};

export const authSlice = createSlice({
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
    clearRegistrationError: (state) => {
      state.registration.error = '';
    },
    clearLoginError: (state) => {
      state.login.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initSession.fulfilled, (state) => {
      state.isSessionInited = true;
    });
    builder.addCase(registerUserThunk.pending, (state) => {
      state.registration.isLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state) => {
      state.registration.isLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, { payload }) => {
      state.registration.isLoading = false;
      state.registration.error = payload!;
    });
    builder.addCase(loginByCredentialsThunk.pending, (state) => {
      state.login.isLoading = true;
    });
    builder.addCase(loginByCredentialsThunk.fulfilled, (state) => {
      state.login.isLoading = false;
    });
    builder.addCase(loginByCredentialsThunk.rejected, (state, { payload }) => {
      state.login.isLoading = false;
      state.login.error = payload!;
    });
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
  async (_, thunkApi) => {
    TokenStorage.getToken() && thunkApi.dispatch(setIsAuthorized(true));
    return;
  },
);

/**
 * Авторизация по логину и паролю
 */
export const loginByCredentialsThunk = createAsyncThunk<
  void,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue, dispatch }) =>
  authApi
    .loginByCredentials(credentials)
    .then((tokens) => {
      TokenStorage.storeToken(tokens);
      dispatch(setIsAuthorized(true));
    })
    .catch((error: ApiError) => {
      return rejectWithValue(error.message);
    }),
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

/**
 * Регистрация пользователя
 */
export const registerUserThunk = createAsyncThunk<
  void,
  RegisterUserBody,
  { rejectValue: string }
>('auth/register', (body, { rejectWithValue, dispatch }) =>
  userApi
    .registerUser(body)
    .then((tokens) => {
      TokenStorage.storeToken(tokens);
      dispatch(setIsAuthorized(true));
    })
    .catch((error: ApiError) => {
      return rejectWithValue(error.message);
    }),
);

export const {
  setUser,
  clearUser,
  setIsAuthorized,
  clearRegistrationError,
  clearLoginError,
} = authSlice.actions;
