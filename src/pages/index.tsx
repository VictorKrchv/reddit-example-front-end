import { useIsAuthorized } from '@features/auth';
import { compileGuards } from '@lib/routing';
import { useMemo } from 'react';
import { renderRoutes } from 'react-router-config';
import { ROUTES } from './routes';

export const Pages = () => {
  const session = useIsAuthorized();

  const routes = useMemo(() => compileGuards(ROUTES, { session }), [session]);

  return renderRoutes(routes);
};
