import { httpClient } from '@api/http-client';
import { Post, PostComment } from '@entities/post';

const getPosts = (params: PaginationParams): Promise<ApiListResponse<Post>> => {
  return httpClient.get('posts', params);
};

const getPost = (id: number): Promise<Post> => {
  return httpClient.get(`posts/${id}`);
};

export type CreatePostBody = Pick<Post, 'title' | 'description'>;

const createPost = (body: CreatePostBody): Promise<Post> => {
  return httpClient.post('posts', body);
};

const getPostComments = (postId: number): Promise<PostComment[]> => {
  return httpClient.get(`posts/${postId}/comments`);
};

export interface AddPostCommentBody {
  message: string;
}

const addCommentToPost = (body: AddPostCommentBody, postId: number) => {
  return httpClient.post(`posts/${postId}/comments`, body);
};

export interface ReplyPostCommentBody {
  message: string;
  parentId: number;
  postId: number;
}

const replyComment = ({ message, parentId, postId }: ReplyPostCommentBody) => {
  return httpClient.post(`posts/${postId}/comments/reply/${parentId}`, {
    message,
  });
};

const getFavoritesPosts = () => {
  return httpClient.get(`posts/favorites`);
};

const addPostToFavorite = (postId: number) => {
  return httpClient.post(`posts/${postId}/favorite`);
};

const deletePostFromFavorite = (postId: number) => {
  return httpClient.delete(`posts/${postId}/favorite`);
};

export const postsApi = {
  getPosts,
  createPost,
  getPost,
  getPostComments,
  addCommentToPost,
  replyComment,
  addPostToFavorite,
  deletePostFromFavorite,
  getFavoritesPosts,
};
