import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CreatePostBody, postsApi } from '@api';
import { Post, postKeys } from '@entities/post';

const validationSchema: yup.SchemaOf<CreatePostBody> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required().min(32).max(2048),
});

interface Params {
  onSuccess: (post: Post) => void;
}

export const useCreatePost = ({ onSuccess }: Params) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(postsApi.createPost, {
    onSuccess: (post) => {
      onSuccess(post);
      queryClient.removeQueries(postKeys.lists());
    },
  });

  const form = useForm<CreatePostBody>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return { mutation, handleSubmit, form };
};
