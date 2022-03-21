import {
  clearUser,
  getCurrentUserThunk,
  useIsAuthorized,
  initSession,
} from '@entities/session';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const sessionIsInited = useSelector((state) => state.session.isSessionInited);
  const isAuth = useIsAuthorized();

  React.useEffect(() => {
    dispatch(initSession());
  }, []);

  React.useEffect(() => {
    if (isAuth) {
      dispatch(getCurrentUserThunk());
    } else {
      dispatch(clearUser());
    }
  }, [isAuth]);

  if (!sessionIsInited) {
    return null;
  }

  return <>{children}</>;
};
