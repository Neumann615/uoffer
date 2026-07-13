
import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware((to) => {
    const { webLoginResult } = useAuthStore()
    if (['/bag', '/my/application-status'].includes(to.path) && !webLoginResult?.apiToken) {
        return navigateTo('/auth');
    }
});