import { AuthProvider } from './auth-provider';

export const MainProvider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
