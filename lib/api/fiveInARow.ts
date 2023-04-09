import axios, { isAxiosError } from 'axios'

export const fiveInARowClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL + '/five-in-a-row',
  withCredentials: true,
})

export class FiveInARowAPI {
  static async start(data: { difficulty: number }) {
    try {
      const response = await fiveInARowClient.post('/start', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async checkWord(data: { word: string; difficulty: number }) {
    try {
      const response = await fiveInARowClient.patch('/check-word', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async end(data: { difficulty: number }) {
    try {
      const response = await fiveInARowClient.patch('/end', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async statistics() {
    try {
      const response = await fiveInARowClient.get('/statistics')
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }
}
