interface ApiError {
  error: string;
  message: string;
  statusCode: number;
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
}
