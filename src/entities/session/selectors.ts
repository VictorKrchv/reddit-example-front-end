import { useSelector } from 'react-redux';

export const useUser = () => useSelector((state) => state.session.user);

export const useIsAuthorized = () =>
  useSelector((state) => !!state.session.isAuthorized);
