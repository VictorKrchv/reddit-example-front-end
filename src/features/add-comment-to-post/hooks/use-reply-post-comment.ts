import { AddPostCommentBody, postsApi, ReplyPostCommentBody } from '@api';
import { PostComment, postCommentsKeys } from '@entities/post';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

export const useReplyPostComment = (postId: number) => {
  const queryClient = useQueryClient();

  const key = React.useMemo(() => postCommentsKeys.byPostId(postId), [postId]);

  const mutation = useMutation<
    PostComment,
    ApiError,
    Omit<ReplyPostCommentBody, 'postId'>
  >((body) => postsApi.replyComment({ ...body, postId }), {
    onSuccess: (newReplyComment, body) => {
      const previousValue = queryClient.getQueryData<PostComment[]>(key);

      if (previousValue) {
        const newValue = previousValue.map((comment) => {
          if (comment.id === body.parentId) {
            comment.children.push(newReplyComment);
          }

          return comment;
        });

        queryClient.setQueryData(key, newValue);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(key);
    },
  });

  return { mutation };
};
