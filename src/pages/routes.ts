import { onlyAnon, redirect } from '@lib/routing';
import { RouteConfig } from 'react-router-config';

import { AuthPage } from './auth';
import { authRoutes } from './auth/routes';

import { Error404Page } from './error404';
import { HomePage } from './home';

import { paths } from './paths';

export const ROUTES: RouteConfig[] = [
  {
    path: paths.home(),
    exact: true,
    component: HomePage,
  },
  {
    path: paths.auth(),
    component: AuthPage,
    guards: [onlyAnon({ redirect: paths.home() })],
    routes: authRoutes(),
  },
  {
    path: paths.notFound(),
    name: '404',
    component: Error404Page,
  },
  {
    path: '*',
    name: '404',
    component: Error404Page,
    guards: [redirect({ redirect: paths.notFound() })],
  },
];
