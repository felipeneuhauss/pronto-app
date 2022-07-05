import axios from 'lib/axios'

interface PostProps<T> {
    payload?: Partial<T> | null;
    path: string;
    setErrors: (value: any) => void | null;
}

export const useApi = () => {
  const get = async (path: string) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api${path}`)

    if (data.data) {
      return data.data
    }

    return data
  }

  const post = async <T>({ path, setErrors, payload }: PostProps<T>) => {
    setErrors([])

    try {
      const { data } = await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api${path}`, payload)

      return data
    } catch (error: any) {
      // @ts-ignore
      if (error.response.status === 422) {
        setErrors(Object.values(error.response.data.errors).flat())
      }
      throw error
    }
  }

  const put = async <T>({ path, setErrors, payload }: PostProps<T>) => {
    setErrors([])

    try {
      const { data } = await axios
        .put<T>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api${path}`, payload)

      return data
    } catch (error: any) {
      // @ts-ignore
      if (error.response.status === 422) {
        setErrors(Object.values(error.response.data.errors).flat())
      }
      throw error
    }
  }

  const remove = async <T>(path: string) => {
    console.log('process.env.NEXT_PUBLIC_BACKEND_URL', process.env.NEXT_PUBLIC_BACKEND_URL)
    const { data } = await axios.delete<T>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api${path}`)

    return data
  }

  return {
    post,
    put,
    get,
    remove
  }
}
