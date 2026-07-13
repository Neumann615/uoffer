
export default defineNuxtRouteMiddleware((to) => {
    if (!to.name) {
        return navigateTo('/');
    }
    const router = useRouter();
    const routes = router.getRoutes();
    const isRouteExists = routes.some(route => route.name === to.name);
    if (!isRouteExists) {
        return navigateTo('/');
    }
});