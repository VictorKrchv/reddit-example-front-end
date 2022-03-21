import { Post } from '@entities/post';
import { dateTimeUtils } from '@lib/date';
import { Favorite, MoreVert, Share } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import * as React from 'react';

interface Props {
  post: Post;
  onClick?: () => void;
}

export const PostCard: React.FC<Props> = ({ post, onClick }) => {
  const { author, title, description, createdAt } = post;

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <Card
      sx={{ maxWidth: 1000, cursor: onClick ? 'pointer' : 'default' }}
      onClick={handleClick}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {author.email.at(0)}
          </Avatar>
        }
        title={author.email}
        subheader={dateTimeUtils.toViewDate(createdAt)}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton post={post} />
        <ShareButton post={post} />
      </CardActions>
    </Card>
  );
};

const LikeButton = ({ post }: { post: Post }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <IconButton onClick={handleClick} aria-label="add to favorites">
      <Favorite />
    </IconButton>
  );
};

const ShareButton = ({ post }: { post: Post }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <IconButton onClick={handleClick} aria-label="share">
      <Share />
    </IconButton>
  );
};