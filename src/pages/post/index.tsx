import { usePost } from '@entities/post';
import { paths } from '@pages/paths';
import { PostCard, PostCardSkeleton } from '@widgets/posts';
import { Redirect, useParams } from 'react-router-dom';
import { MainTemplate } from '@ui';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  const { query } = usePost(Number(id));

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
      <PostCard post={post} />
    </MainTemplate>
  );
};