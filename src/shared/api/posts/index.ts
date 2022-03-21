import { httpClient } from '@api/http-client';
import { Post } from '@entities/post';

const getPosts = (): Promise<ApiListResponse<Post>> => {
  return httpClient.get('posts');
};

const getPost = (id: number): Promise<Post> => {
  return httpClient.get(`posts/${id}`);
};

export type CreatePostBody = Omit<Post, 'author' | 'id' | 'createdAt'>;

const createPost = (body: CreatePostBody): Promise<Post> => {
  return httpClient.post('posts', body);
};

export const postsApi = { getPosts, createPost, getPost };