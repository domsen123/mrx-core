import type { Router } from 'vue-router';
export const redirect = async (
  to: string,
  router: Router,
  ingoreSource = false,
) => {
  const { useRouteQuery } = await import('@vueuse/router');

  const path = useRouteQuery<string>('source', to, {
    router,
    route: router.currentRoute.value,
  });

  await router.push(ingoreSource ? to : path.value);
};
