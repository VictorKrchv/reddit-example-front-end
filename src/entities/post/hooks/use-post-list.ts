import { postsApi } from '@api';
import { usePagination } from '@lib/hooks';
import React from 'react';
import { useQuery } from 'react-query';
import { postKeys } from '../query-keys';

export const usePostList = () => {
  const pagination = usePagination();

  const params = { take: pagination.take, page: pagination.page };

  const query = useQuery(
    postKeys.list(params),
    () => postsApi.getPosts(params),
    {
      onSuccess: (data) => {
        pagination.setMeta(data.meta);
      },
    },
  );

  return { query, pagination };
};
