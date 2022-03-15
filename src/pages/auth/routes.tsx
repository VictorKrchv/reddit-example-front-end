import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import { paths } from '@pages/paths';

import { SignInPage } from './sign-in';
import { SignUpPage } from './sign-up';

export const authRoutes = (): RouteConfig[] => [
  {
    path: paths.signIn(),
    exact: true,
    component: SignInPage,
  },
  {
    path: paths.signUp(),
    exact: true,
    component: SignUpPage,
  },
  {
    path: paths.auth(),
    exact: true,
    component: () => <Redirect to={paths.signIn()} />,
  },
  {
    path: '*',
    component: () => <Redirect to={paths.notFound()} />,
  },
];
