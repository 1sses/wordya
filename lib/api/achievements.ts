import axios, { isAxiosError } from 'axios'

export const fiveInARowClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL + '/achievements',
  withCredentials: true,
})

export class AchievementsAPI {
  static async findAll() {
    try {
      const response = await fiveInARowClient.get('')
      return response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) return error.response?.data
    }
  }
}
