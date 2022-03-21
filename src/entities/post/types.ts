import { User } from '@entities/session';

export interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
}
