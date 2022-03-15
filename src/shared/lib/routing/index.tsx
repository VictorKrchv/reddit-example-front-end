import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

interface Context {
  session: boolean;
}

type Guard = (currentRoute: RouteConfig, context: Context) => void;

export function compileGuards(
  routes: RouteConfig[],
  context: Context,
): RouteConfig[] {
  return routes
    .map((route) =>
      route.guards
        ? route.guards.reduce(
            (currentRoute: RouteConfig, guard: Guard) =>
              currentRoute ? guard(currentRoute, context) : undefined,
            route,
          )
        : route,
    )
    .filter(Boolean);
}

export const onlyAnon =
  ({ redirect }: { redirect: string }) =>
  (route: RouteConfig, { session }: { session: boolean }) =>
    session ? { ...route, component: () => <Redirect to={redirect} /> } : route;

export const onlyUsers =
  ({ redirect }: { redirect: string }) =>
  (route: RouteConfig, { session }: { session: boolean }) =>
    session ? route : { ...route, component: () => <Redirect to={redirect} /> };

export const redirect =
  ({ redirect }: { redirect: string }) =>
  (route: RouteConfig) => ({
    ...route,
    component: () => <Redirect to={redirect} />,
  });
