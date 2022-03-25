import { usePostComments } from '@entities/post';
import { useUser } from '@entities/session';
import {
  useAddCommentToPost,
  useReplyPostComment,
} from '@features/add-comment-to-post';
import { Comments } from '@ui';

interface Props {
  postId: number;
}

export const PostComments: React.FC<Props> = ({ postId }) => {
  const { query } = usePostComments(postId);
  const { mutation: addCommentToPostMutation } = useAddCommentToPost(postId);
  const { mutation: replyPostCommentMutation } = useReplyPostComment(postId);
  const user = useUser();

  if (query.isLoading) {
    return <div>...loading</div>;
  }

  if (!query.data) {
    return <>NO DATA</>;
  }

  const handleAddComment = (message: string) => {
    addCommentToPostMutation.mutateAsync({ message });
  };

  const handleReplyComment = (message: string, parent: BaseComment) => {
    replyPostCommentMutation.mutateAsync({ message, parentId: parent.id });
  };

  return (
    <Comments
      loadingParentId={
        replyPostCommentMutation.isLoading
          ? replyPostCommentMutation.variables?.parentId
          : null
      }
      onReplyComment={handleReplyComment}
      onAddComment={handleAddComment}
      addCommentIsLoading={addCommentToPostMutation.isLoading}
      user={user ? { name: user.email } : null}
      comments={query.data}
    />
  );
};
