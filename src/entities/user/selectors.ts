import { RootState } from '@app/store';
import { useSelector } from 'react-redux';

export const useIsAuthorized = () => useSelector((state) => !!state.user.user);
