interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface BaseComment extends BaseEntity {
  author: { email: string; id: number };
  message: string;
  parent: BaseComment;
  children: BaseComment[];
}

interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

interface PaginationParams {
  page: number;
  take: number;
}

interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface ApiListResponse<T> {
  data: T[];
  meta: Meta;
}
