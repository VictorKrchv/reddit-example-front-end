import { Post, useFavoritesPosts } from '@entities/post';
import { useIsAuthorized } from '@entities/session';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useAddRemovePostToFavorite } from './hooks';

interface Props {
  post: Post;
}

export const PostFavoriteActionButton: React.FC<Props> = ({ post }) => {
  const isAuth = useIsAuthorized();

  const {
    query: { data: favoritesPosts },
  } = useFavoritesPosts();

  const inFavorite = React.useMemo(() => {
    return favoritesPosts
      ? favoritesPosts.some((p) => p.id === post.id)
      : false;
  }, [favoritesPosts]);

  const { addPostToFavoriteMutation, deletePostFromFavorites, isLoading } =
    useAddRemovePostToFavorite(post.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inFavorite
      ? deletePostFromFavorites.mutateAsync()
      : addPostToFavoriteMutation.mutateAsync();
  };

  return isAuth ? (
    <IconButton
      disabled={isLoading}
      onClick={handleClick}
      aria-label="add to favorites"
    >
      {post.favoritesCount} {inFavorite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  ) : null;
};
