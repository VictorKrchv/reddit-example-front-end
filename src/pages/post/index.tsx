import { usePostDetails } from '@entities/post';
import { Stack } from '@mui/material';
import { paths } from '@pages/paths';
import { MainTemplate } from '@ui';
import { PostCard, PostCardSkeleton, PostComments } from '@widgets/posts';
import { Redirect, useParams } from 'react-router-dom';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  const { query } = usePostDetails(Number(id));

  if (query.isLoading) {
    return (
      <MainTemplate title="Post">
        <PostCardSkeleton />
      </MainTemplate>
    );
  }

  if (query.error) {
    return <Redirect to={paths.home()} />;
  }

  const post = query.data!;

  return (
    <MainTemplate title={`Post ${post.id}`}>
      <Stack spacing={2}>
        <PostCard post={post} />
        <PostComments postId={Number(id)} />
      </Stack>
    </MainTemplate>
  );
};
