import { useSelector } from 'react-redux';

export const useUser = () => useSelector((state) => state.auth.user);

export const useIsAuthorized = () =>
  useSelector((state) => !!state.auth.isAuthorized);
