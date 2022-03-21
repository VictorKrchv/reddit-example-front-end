import { CreatePostForm } from '@features/create-post';
import { paths } from '@pages/paths';
import { MainTemplate } from '@ui';
import { useHistory } from 'react-router-dom';

export const CreatePostPage = () => {
  const history = useHistory();

  return (
    <MainTemplate title="Create a post">
      <CreatePostForm
        onCancelClicked={() => history.push(paths.home())}
        onPostCreated={(post) => history.push(paths.post(post.id))}
      />
    </MainTemplate>
  );
};
