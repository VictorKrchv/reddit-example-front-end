import { useQuery } from 'react-query';

import { postsApi } from '@api';
import { postKeys } from '../query-keys';

export const usePostDetails = (id: number) => {
  const query = useQuery(postKeys.detail(id), () => postsApi.getPost(id));

  return { query };
};
