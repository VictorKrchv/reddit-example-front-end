import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';

import { AuthProvider } from './auth-provider';
import { store } from '../store';
import { queryClient } from '@lib/react-query';

export const MainProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
