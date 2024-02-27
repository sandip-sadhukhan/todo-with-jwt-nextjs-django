import { AxiosError } from "axios"
import axios from "./axiosInstance"

const fetchData = async (api: string) => {
  try {
    const response = await axios.get(api)

    const data = response.data

    return {
      props: { ...data },
    }
  } catch (error) {
    const err = error as AxiosError

    const status = err.response?.status || 503
    const description = err.response?.statusText || "Service Unavailable"

    return {
      props: {
        error: {
          status,
          description,
        },
      },
    }
  }
}

export default fetchData
