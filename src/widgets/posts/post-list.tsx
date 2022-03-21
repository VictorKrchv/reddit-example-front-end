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
  skeletonSize = 6,
}) => {
  if (isLoading) {
    return (
      <Grid container spacing={2} direction="column">
        {Array.from({ length: skeletonSize }).map((_, idx) => (
          <Grid item key={idx}>
            <PostCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
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
