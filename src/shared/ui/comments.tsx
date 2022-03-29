import { dateTimeUtils } from '@lib/date';
import { useDisclosure, usePrevious } from '@lib/hooks';
import { Picker } from 'emoji-mart';
import {
  ArrowDropDown,
  ArrowDropUp,
  ThumbDown,
  ThumbUp,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

import { UserAvatar } from './user-avatar';
import { EmojiPicker } from './emoji-picker';

interface IUser {
  name: string;
  avatarSrc?: string;
}

interface Props {
  comments: BaseComment[];
  user?: IUser | null;
  onAddComment: (comment: string) => void;
  onReplyComment: (comment: string, parent: BaseComment) => void;
  addCommentIsLoading: boolean;
  loadingParentId?: number | null;
}

export const Comments: React.FC<Props> = ({
  comments,
  user,
  onAddComment,
  addCommentIsLoading,
  onReplyComment,
  loadingParentId,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6">
          {comments.length} comments
        </Typography>
        {user && (
          <AddCommentForm
            submitButtonText="Leave a comment"
            placeholder="Write your comment here"
            isLoading={addCommentIsLoading}
            onSubmit={onAddComment}
            user={user}
            isNewCommentForm
            showButtonsAfterFocus
          />
        )}
        <Stack spacing={2} sx={{ mt: 3 }}>
          {comments.map((comment) => (
            <Comment
              user={user}
              key={comment.id}
              comment={comment}
              isLoading={comment.id === loadingParentId}
              onReply={(mess) => onReplyComment(mess, comment)}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

interface CommentProps {
  comment: BaseComment;
  user?: IUser | null;
  onReply?: (message: string) => void;
  isChild?: boolean;
  isLoading?: boolean;
}

const Comment = ({
  comment,
  user,
  onReply,
  isChild,
  isLoading,
}: CommentProps) => {
  const previousChildrenLength = usePrevious<number>(comment.children.length);

  const {
    isOpen: IsShowAnswers,
    open: showAnswers,
    close: hideAnswers,
  } = useDisclosure();

  React.useEffect(() => {
    if (comment.children.length !== previousChildrenLength) {
      showAnswers();
    }
  }, [comment]);

  const {
    isOpen: isShowAnswerInput,
    open: showAnswerInput,
    close: hideAnswerInput,
  } = useDisclosure();

  const { author, message, createdAt } = comment;

  const needToShowAnswerLogic = onReply && user;

  return (
    <Grid container wrap="nowrap">
      <Grid item>
        <UserAvatar
          sx={
            isChild
              ? {
                  width: 28,
                  height: 28,
                  fontSize: 12,
                }
              : {}
          }
          username={author.email}
        />
      </Grid>
      <Grid item sx={{ ml: 1, flex: '1 1 auto' }}>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {author.email}
          </Typography>
          <Typography variant="caption" sx={{ my: 'auto !important' }}>
            {dateTimeUtils.toViewDate(createdAt)}
          </Typography>
        </Stack>
        <Typography gutterBottom variant="body1">
          {message}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small">
            <ThumbUp fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <ThumbDown fontSize="small" />
          </IconButton>
          {needToShowAnswerLogic && (
            <Button variant="text" onClick={showAnswerInput}>
              Answer
            </Button>
          )}
        </Stack>
        {isLoading && <CircularProgress />}

        {!isLoading && needToShowAnswerLogic && isShowAnswerInput && (
          <AddCommentForm
            submitButtonText="send"
            placeholder="Write your answer here"
            isNewCommentForm={false}
            onSubmit={onReply}
            user={user}
            onCancel={hideAnswerInput}
          />
        )}

        {comment.children?.length > 0 && (
          <Typography
            onClick={IsShowAnswers ? hideAnswers : showAnswers}
            variant="caption"
            sx={{
              color: blue[500],
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '1em',
            }}
          >
            {IsShowAnswers ? (
              <>
                <ArrowDropUp /> Hide answers
              </>
            ) : (
              <>
                <ArrowDropDown /> Show answers
              </>
            )}
          </Typography>
        )}

        {IsShowAnswers &&
          comment?.children?.map((comm) => (
            <Comment key={comm.id} isChild user={user} comment={comm} />
          ))}
      </Grid>
    </Grid>
  );
};

interface AddCommentFormProps {
  user: IUser;
  showButtonsAfterFocus?: boolean;
  isLoading?: boolean;
  isNewCommentForm?: boolean;

  placeholder?: string;
  submitButtonText?: string;

  onCancel?: () => void;
  onSubmit: (message: string) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  onCancel = () => {},
  showButtonsAfterFocus,
  user,
  onSubmit,
  isLoading,
  isNewCommentForm,
  placeholder,
  submitButtonText = 'save',
}) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    return handleCancel;
  }, [isLoading]);

  const {
    isOpen: isShowButtons,
    open: showButtons,
    close: hideButtons,
  } = useDisclosure(!showButtonsAfterFocus);

  const clearInput = () => setValue('');

  const handleCancel = () => {
    onCancel();
    hideButtons();
    clearInput();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(value);
  };

  const submitButtonIsDisabled = !value || isLoading;

  return (
    <Grid container spacing={1}>
      <Grid item>
        <UserAvatar
          username={user.name}
          sx={
            isNewCommentForm
              ? {}
              : {
                  width: 28,
                  height: 28,
                  fontSize: 12,
                }
          }
        />
      </Grid>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          sx={{ flex: '1 1 auto' }}
        >
          <TextField
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={showButtons}
            minRows={1}
            multiline
            fullWidth
            id="standard-basic"
            variant="standard"
          />
          {isShowButtons && (
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Grid item>
                <EmojiPicker
                  onSelect={(emoji) => setValue((value) => value + emoji)}
                />
              </Grid>
              <Grid item>
                <Stack direction="row">
                  <Button size="small" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    disabled={submitButtonIsDisabled}
                    type="submit"
                    variant="contained"
                    size="small"
                  >
                    {submitButtonText}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};
