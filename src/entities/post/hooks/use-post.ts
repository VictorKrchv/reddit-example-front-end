import { postsApi } from '@api';
import { useQuery } from 'react-query';

export const usePost = (id: number) => {
  const query = useQuery(['post', id], () => postsApi.getPost(id));

  return { query };
};
