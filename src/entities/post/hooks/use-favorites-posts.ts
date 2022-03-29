import { useQuery } from 'react-query';
import { useIsAuthorized } from '@entities/session';

import { postsApi } from '@api';

import { postKeys } from '../query-keys';
import { Post } from '../types';

export const useFavoritesPosts = () => {
  const isAuth = useIsAuthorized();

  const query = useQuery<Post[]>(
    postKeys.favorites,
    () => postsApi.getFavoritesPosts(),
    { initialData: [], enabled: isAuth },
  );

  return { query };
};
