import { Post, useFavoritesPosts } from '@entities/post';
import { paths } from '@pages/paths';
import { MainTemplate } from '@ui';
import { PostsList } from '@widgets/posts';
import { useHistory } from 'react-router-dom';

export const FavoritePostsPage = () => {
  return (
    <MainTemplate title="Favorite posts">
      <Posts />
    </MainTemplate>
  );
};

const Posts = () => {
  const history = useHistory();

  const { query } = useFavoritesPosts();

  const handlePostClick = (post: Post) => {
    history.push(paths.post(post.id));
  };

  return (
    <>
      <PostsList
        onPostClick={handlePostClick}
        posts={query.data}
        isLoading={query.isLoading}
      />
    </>
  );
};
