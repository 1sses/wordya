import { process } from 'unenv/runtime/node/process/_process'
import { routes } from '~/routes'

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    // skip middleware on server
    if (process.server) return

    const authStore = useAuthStore()
    const currentRoute = routes.find((route) => route.path === to.fullPath)

    // 404
    if (!currentRoute) return

    // AUTHENTICATION
    if (currentRoute.public) return

    if (!authStore.isAuthenticated) {
      await authStore.reAuthenticate()
    }
  } catch (e: any) {
    console.error(e.message)
    return navigateTo('/login')
  }
})
