import { Link, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

import { Post, usePosts } from '@entities/post';
import { useIsAuthorized } from '@entities/session';
import { paths } from '@pages/paths';
import { MainTemplate } from '@ui';
import { PostsList } from '@widgets/posts';

export const HomePage = () => {
  const { query } = usePosts();
  const history = useHistory();
  const isAuth = useIsAuthorized();

  const handlePostClick = (post: Post) => {
    history.push(paths.post(post.id));
  };

  return (
    <MainTemplate>
      {isAuth && (
        <Link to={paths.createPost()}>
          <Button variant="outlined" sx={{ mb: 2 }}>
            Create post
          </Button>
        </Link>
      )}
      <PostsList
        onPostClick={handlePostClick}
        posts={query.data?.data}
        isLoading={query.isLoading}
      />
    </MainTemplate>
  );
};
