import { process } from 'unenv/runtime/node/process/_process'
import { routes } from '~/routes'

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    // skip middleware on server
    if (process.server) return

    const authStore = useAuthStore()
    const currentRoute = routes.find((route) => route.path === to.fullPath)

    // AUTHENTICATION
    if (currentRoute?.public) return

    if (!authStore.isAuthenticated) {
      // TODO: fix first reAuth on loading
      await authStore.reAuthenticate()
    }

    // PERMISSIONS
    // if (!currentRoute?.permissions.includes(user?.permission)) {
    //   return navigateTo('/login')
    // }
  } catch (e: any) {
    console.error(e.message)
    return navigateTo('/login')
  }
})
