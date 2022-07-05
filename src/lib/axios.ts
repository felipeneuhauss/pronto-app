import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

axios.interceptors.request.use(
  async config => {
    config.headers = {
      Accept: 'application/json'
    }

    const token =
            typeof window !== 'undefined'
              ? JSON.parse(localStorage.getItem('token') || '')
              : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default axios
