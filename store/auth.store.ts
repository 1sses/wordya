import { defineStore } from 'pinia'
import axios, { isAxiosError } from 'axios'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL + '/api/auth',
  withCredentials: true,
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as any,
  }),
  actions: {
    async register(data: { email: string; password: string; name: string }) {
      try {
        const response = await authClient.post('/register', data)
        if (!response.data.ok) throw new Error(response.data.message)
        this.user = response.data.user
        return response.data
      } catch (error) {
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
      }
    },

    async login(data: { email: string; password: string }) {
      try {
        const response = await authClient.post('/login', data)
        if (!response.data.ok) throw new Error(response.data.message)
        this.isAuthenticated = true
        this.user = response.data.data.user
        return response.data
      } catch (error) {
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
      }
    },

    async reAuthenticate() {
      try {
        const response = await authClient.get('/re-authenticate')
        if (!response.data.ok) throw new Error(response.data.message)
        this.isAuthenticated = true
        this.user = response.data.data.user
        return response.data
      } catch (error) {
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
      }
    },

    async logout() {
      try {
        const response = await authClient.get('/logout')
        if (!response.data.ok) throw new Error(response.data.message)
        this.isAuthenticated = false
        this.user = null
        return response.data
      } catch (error) {
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
      }
    },

    async confirmEmail({ token }: { token: string }) {
      try {
        const response = await authClient.get(`/confirm-email/${token}`)
        if (!response.data.ok) throw new Error(response.data.message)
        return response.data
      } catch (error) {
        if (isAxiosError(error)) throw new Error(error.response?.data.message)
      }
    },
  },
})
