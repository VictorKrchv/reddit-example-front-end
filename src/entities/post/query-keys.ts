export const postKeys = {
  all: ['posts'] as const,
  favorites: ['posts', 'favorites'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: Record<any, any>) =>
    [...postKeys.lists(), { ...filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

export const postCommentsKeys = {
  all: ['posts-comments'] as const,
  byPostId: (id: number) => [...postCommentsKeys.all, id] as const,
};
