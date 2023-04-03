import axios, { isAxiosError } from 'axios'

export const fiveInARowClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL + '/five-in-a-row',
  withCredentials: true,
})

export class FiveInARowAPI {
  static async start(data: { email: string; password: string; name: string }) {
    try {
      const response = await fiveInARowClient.post('/start', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async submitWord(data: {
    email: string
    password: string
    name: string
  }) {
    try {
      const response = await fiveInARowClient.post('/submit-word', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async end(data: { email: string; password: string; name: string }) {
    try {
      const response = await fiveInARowClient.post('/end', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }
}
