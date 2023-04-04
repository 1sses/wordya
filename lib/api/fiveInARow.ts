import axios, { isAxiosError } from 'axios'

export const fiveInARowClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL + '/five-in-a-row',
  withCredentials: true,
})

export class FiveInARowAPI {
  static async start() {
    try {
      const response = await fiveInARowClient.get('/start')
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async checkWord(data: { word: string }) {
    try {
      const response = await fiveInARowClient.post('/check-word', data)
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }

  static async end() {
    try {
      const response = await fiveInARowClient.get('/end')
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }
}
