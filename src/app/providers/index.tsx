import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';

import { store } from '../store';
import { AuthProvider } from './auth-provider';
import { WithQueryClient } from './with-react-query';

export const MainProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <WithQueryClient>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>{children}</AuthProvider>
      </WithQueryClient>
    </Provider>
  );
};
