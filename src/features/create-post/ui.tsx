import { Button, Grid, TextField } from '@mui/material';

import { Post } from '@entities/post';
import { useCreatePost } from './hooks';

interface Props {
  onPostCreated: (post: Post) => void;
  onCancelClicked: () => void;
}

export const CreatePostForm: React.FC<Props> = ({
  onPostCreated,
  onCancelClicked,
}) => {
  const { form, mutation, handleSubmit } = useCreatePost({
    onSuccess: onPostCreated,
  });

  const {
    formState: { errors },
    register,
  } = form;

  return (
    <Grid
      onSubmit={handleSubmit}
      component="form"
      container
      spacing={3}
      direction="column"
    >
      <Grid item>
        <TextField
          required
          id="address1"
          label="Title"
          fullWidth
          autoComplete="shipping address-line1"
          variant="outlined"
          error={!!errors.title}
          helperText={errors?.title?.message}
          {...register('title')}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          id="address1"
          label="Description"
          minRows={6}
          multiline
          fullWidth
          autoComplete="shipping address-line1"
          variant="outlined"
          error={!!errors.description}
          helperText={errors?.description?.message}
          {...register('description')}
        />
      </Grid>
      <Grid item>
        <Grid container direction="row-reverse">
          <Button
            type="submit"
            disabled={mutation.isError}
            variant="contained"
            sx={{ ml: 1 }}
          >
            Save
          </Button>
          <Button onClick={onCancelClicked}>Cancel</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
