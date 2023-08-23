import { useState, useEffect } from 'react'

interface UseFetchResult {
  data: any
  loading: boolean
  error: any
}
type UseLazyFetchResult = [
  (url: string, options?: RequestInit) => void,
  {
    data: any
    loading: boolean
    error: any
  }
]

export const useFetch = (url: string, options: RequestInit): UseFetchResult => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(url, options)
      const result = await response.json()

      if (response.ok) {
        setData(result)
        setLoading(false)
      } else {
        setError(result.message)
        setLoading(false)
      }
    } catch (error: any) {
      setError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error }
}

export const useLazyFetch = (): UseLazyFetchResult => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (url: string, options?: RequestInit) => {
    setLoading(true)
    try {
      const response = await fetch(url, options)
      const result = await response.json()

      if (response.ok) {
        setData(result)
        setLoading(false)
      } else {
        setError(result.message)
        setLoading(false)
      }
    } catch (error: any) {
      setError(error)
      setLoading(false)
    }
  }

  return [fetchData, { data, loading, error }]
}

export const useToken = () => {
  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  if (token) return { token }
  return { token: null }
}
