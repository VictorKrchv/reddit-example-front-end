import { postsApi } from '@api';
import { useQuery } from 'react-query';
import { postCommentsKeys } from '../query-keys';

export const usePostComments = (postId: number) => {
  const query = useQuery(postCommentsKeys.byPostId(postId), () =>
    postsApi.getPostComments(postId),
  );

  return { query };
};
