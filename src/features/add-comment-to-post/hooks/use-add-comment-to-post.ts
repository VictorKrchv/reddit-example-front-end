import { AddPostCommentBody, postsApi } from '@api';
import { PostComment, postCommentsKeys } from '@entities/post';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

export const useAddCommentToPost = (postId: number) => {
  const queryClient = useQueryClient();

  const key = React.useMemo(() => postCommentsKeys.byPostId(postId), [postId]);

  const mutation = useMutation<PostComment, ApiError, AddPostCommentBody>(
    (body) => postsApi.addCommentToPost(body, postId),
    {
      onSuccess: (newComment) => {
        const previousValue = queryClient.getQueryData<PostComment[]>(key);

        if (previousValue) {
          const newValue = [newComment, ...previousValue];
          queryClient.setQueryData(key, newValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
    },
  );

  return { mutation };
};
