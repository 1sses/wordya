import axios, { isAxiosError } from 'axios'

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL + '/auth',
  withCredentials: true,
})

export class AuthAPI {
  static async register(data: {
    email: string
    password: string
    name: string
  }) {
    try {
      const response = await authClient.post('/register', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async confirmEmail(token: string) {
    try {
      const response = await authClient.get(`/confirm-email/${token}`)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async login(data: { email: string; password: string }) {
    try {
      const response = await authClient.post('/login', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async validate() {
    try {
      const response = await authClient.get('/validate')
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async logout() {
    try {
      const response = await authClient.get('/logout')
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }
}
