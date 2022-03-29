import { postsApi } from '@api';
import { Post, postKeys } from '@entities/post';
import { useMutation, useQueryClient } from 'react-query';

export const useAddRemovePostToFavorite = (postId: number) => {
  const queryClient = useQueryClient();

  const updatePosts = (post: Post) => {
    const postDetailData = queryClient.getQueryData<Post>(
      postKeys.detail(postId),
    );

    if (postDetailData) {
      queryClient.setQueryData(postKeys.detail(postId), {
        ...postDetailData,
        ...post,
      });
    }

    const listsData = queryClient.getQueriesData<ApiListResponse<Post>>(
      postKeys.lists(),
    );

    if (listsData) {
      listsData.forEach(([key, data]) => {
        queryClient.setQueryData(key, {
          ...data,
          data: data.data.map((p) =>
            p.id === post.id ? { ...p, ...post } : p,
          ),
        });
      });
    }

    const favoritesData = queryClient.getQueryData<Post[]>(postKeys.favorites);

    if (favoritesData) {
      const hasInFavorite = favoritesData.some((p) => p.id === post.id);

      const result = hasInFavorite
        ? favoritesData.filter((p) => p.id !== post.id)
        : [...favoritesData, post];

      queryClient.setQueryData(postKeys.favorites, result);
    }
  };

  const addPostToFavoriteMutation = useMutation(
    () => postsApi.addPostToFavorite(postId),
    { onSuccess: updatePosts },
  );

  const deletePostFromFavorites = useMutation(
    () => postsApi.deletePostFromFavorite(postId),
    { onSuccess: updatePosts },
  );

  const isLoading =
    addPostToFavoriteMutation.isLoading || deletePostFromFavorites.isLoading;

  return { addPostToFavoriteMutation, deletePostFromFavorites, isLoading };
};
