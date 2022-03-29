import { onlyAnon, onlyUsers, redirect } from '@lib/routing';
import { RouteConfig } from 'react-router-config';

import { AuthPage } from './auth';
import { authRoutes } from './auth/routes';
import { CreatePostPage } from './create-post';

import { Error404Page } from './error404';
import { FavoritePostsPage } from './favorites';
import { HomePage } from './home';

import { paths } from './paths';
import { PostPage } from './post';
import { SettingsPage } from './settings';

export const ROUTES: RouteConfig[] = [
  {
    path: paths.home(),
    exact: true,
    component: HomePage,
  },
  {
    path: paths.post(':id'),
    exact: true,
    component: PostPage,
  },
  {
    path: paths.settings(),
    component: SettingsPage,
    guards: [onlyUsers({ redirect: paths.home() })],
  },
  {
    path: paths.favorites(),
    component: FavoritePostsPage,
    guards: [onlyUsers({ redirect: paths.home() })],
  },
  {
    path: paths.createPost(),
    component: CreatePostPage,
    guards: [onlyUsers({ redirect: paths.home() })],
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
