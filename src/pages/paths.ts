export const paths = {
  home: () => '/',
  auth: () => '/auth',
  signIn: () => '/auth/sign-in',
  signUp: () => '/auth/sign-up',
  notFound: () => '/404',
  settings: () => '/settings',
  createPost: () => '/create-post',
  post: (id: number | string) => `/post/${id}`,
  favorites: () => '/favorites',
};
