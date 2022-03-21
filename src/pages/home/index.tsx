import { Link, useHistory } from 'react-router-dom';
import { Button, Pagination } from '@mui/material';

import { Post, usePostList } from '@entities/post';
import { useIsAuthorized } from '@entities/session';
import { paths } from '@pages/paths';
import { MainTemplate } from '@ui';
import { PostsList } from '@widgets/posts';

export const HomePage = () => {
  const isAuth = useIsAuthorized();

  return (
    <MainTemplate>
      {isAuth && (
        <Link to={paths.createPost()}>
          <Button variant="outlined" sx={{ mb: 2 }}>
            Create post
          </Button>
        </Link>
      )}
      <Posts />
    </MainTemplate>
  );
};

const Posts = () => {
  const history = useHistory();

  const { query, pagination } = usePostList();

  const handlePostClick = (post: Post) => {
    history.push(paths.post(post.id));
  };

  return (
    <>
      <PostsList
        onPostClick={handlePostClick}
        posts={query.data?.data}
        isLoading={query.isLoading}
      />
      <Pagination
        sx={{ mt: 2 }}
        count={pagination.totalPages}
        page={pagination.page}
        onChange={(_, page) => pagination.setPage(page)}
      />
    </>
  );
};
