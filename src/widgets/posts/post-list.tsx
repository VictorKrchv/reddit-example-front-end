import { Post } from '@entities/post';
import { Grid } from '@mui/material';
import { PostCard } from './post-card';
import { PostCardSkeleton } from './post-card-skeleton';

interface Props {
  posts?: Post[];
  isLoading: boolean;
  onPostClick?: (post: Post) => void;
  skeletonSize?: number;
}

export const PostsList: React.FC<Props> = ({
  posts,
  isLoading,
  onPostClick = () => {},
  skeletonSize = 10,
}) => {
  if (isLoading) {
    return <SkeletonList size={skeletonSize} />;
  }

  if (!posts) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column">
      {posts.map((post) => (
        <Grid item key={post.id}>
          <PostCard onClick={() => onPostClick(post)} post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

const SkeletonList = ({ size }: { size: number }) => (
  <Grid container spacing={2} direction="column">
    {Array.from({ length: size }).map((_, idx) => (
      <Grid item key={idx}>
        <PostCardSkeleton />
      </Grid>
    ))}
  </Grid>
);
