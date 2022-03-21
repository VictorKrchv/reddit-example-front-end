import { postsApi } from '@api';
import { useQuery } from 'react-query';

export const usePosts = () => {
  const query = useQuery('posts', postsApi.getPosts);

  return { query };
};
